function parseQuery(querystring) {
    return querystring ? JSON.parse('{"' + querystring.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}') : {}
}

function parseParams(pattern, uri) {
    let params = {};

    const patternArray = pattern.split('/').filter((path) => { return path != '' });
    const uriArray = uri.split('/').filter((path) => { return path != '' });

    patternArray.map((pattern, i) => {
        if (/^:/.test(pattern)) {
            params[pattern.substring(1)] = uriArray[i];
        }
    });
    return params
}

function patternToRegExp(pattern) {
    if (pattern) {
        return new RegExp('^(|/)' + pattern.replace(/:[^\s/]+/g, '([\\w\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff-]+)') + '(|/)$');
    } else {
        return new RegExp('(^$|^/$)');
    }
}

function testRoute(uri, pattern) {
    if (patternToRegExp(pattern).test(uri)) {
        return true;
    }
}

function router(base) {
    return class extends base {
        static get properties() {
            return {
                route: { type: String, reflect: true, attribute: 'route' },
                canceled: { type: Boolean }
            };
        }

        constructor(...args) {
            super(...args);

            this.route = '';
            this.canceled = false;
        }

        connectedCallback(...args) {
            super.connectedCallback(...args);

            // @ts-ignore
            this.routing(this.constructor.routes, (...args) => this.router(...args));
            window.addEventListener('route', () => {
                // @ts-ignore
                this.routing(this.constructor.routes, (...args) => this.router(...args));
            });

            window.onpopstate = () => {
                window.dispatchEvent(new CustomEvent('route'));
            };
        }

        routed(name, params, query, data, callback, localCallback) {
            localCallback && localCallback(name, params, query, data);
            callback(name, params, query, data);
        }

        routing(routes, callback) {
            this.canceled = true;

            const uri = decodeURI(window.location.pathname);
            const querystring = decodeURI(window.location.search);

            let notFoundRoute = routes.filter(route => route.pattern === '*')[0];
            let activeRoute = routes.filter(route => route.pattern !== '*' && testRoute(uri, route.pattern))[0];
            let query = parseQuery(querystring);

            if (activeRoute) {
                activeRoute.params = parseParams(activeRoute.pattern, uri);
                activeRoute.data = activeRoute.data || {};
                if (activeRoute.authentication && activeRoute.authentication.authenticate && typeof activeRoute.authentication.authenticate === 'function') {
                    this.canceled = false;
                    Promise.resolve(activeRoute.authentication.authenticate.bind(this).call())
                        .then((authenticated) => {
                            if (!this.canceled) {
                                if (authenticated) {
                                    if (activeRoute.authorization && activeRoute.authorization.authorize && typeof activeRoute.authorization.authorize === 'function') {
                                        this.canceled = false;
                                        Promise.resolve(activeRoute.authorization.authorize.bind(this).call())
                                            .then((authorizatied) => {
                                                if (!this.canceled) {
                                                    if (authorizatied) {
                                                        this.routed(activeRoute.name, activeRoute.params, query, activeRoute.data, callback, activeRoute.callback);
                                                    } else {
                                                        this.routed(activeRoute.authorization.unauthorized.name, activeRoute.params, query, activeRoute.data, callback, activeRoute.callback);
                                                    }
                                                }
                                            });
                                    } else {
                                        this.routed(activeRoute.name, activeRoute.params, query, activeRoute.data, callback, activeRoute.callback);
                                    }
                                } else {
                                    this.routed(activeRoute.authentication.unauthenticated.name, activeRoute.params, query, activeRoute.data, callback, activeRoute.callback);
                                }
                            }
                        });
                } else if (activeRoute.authorization && activeRoute.authorization.authorize && typeof activeRoute.authorization.authorize === 'function') {
                    this.canceled = false;
                    Promise.resolve(activeRoute.authorization.authorize.bind(this).call())
                        .then((authorizatied) => {
                            if (!this.canceled) {
                                if (authorizatied) {
                                    this.routed(activeRoute.name, activeRoute.params, query, activeRoute.data, callback, activeRoute.callback);
                                } else {
                                    this.routed(activeRoute.authorization.unauthorized.name, activeRoute.params, query, activeRoute.data, callback, activeRoute.callback);
                                }
                            }
                        });
                } else {
                    this.routed(activeRoute.name, activeRoute.params, query, activeRoute.data, callback, activeRoute.callback);
                }
            } else if (notFoundRoute) {
                notFoundRoute.data = notFoundRoute.data || {};
                this.routed(notFoundRoute.name, {}, query, notFoundRoute.data, callback, notFoundRoute.callback);
            }
        }
    };
}

function navigator(base) {
    return class extends base {
        navigate(href) {
            window.history.pushState({}, null, href);
            window.dispatchEvent(new CustomEvent('route'));
        }
    };
}

function outlet(base) {
    return class extends base {

        static get properties() {
            return {
                activeRoute: { type: String, reflect: true, attribute: 'active-route' }
            };
        }

        attributeChangedCallback(...args) {
            super.attributeChangedCallback(...args);

            args.some(arg => arg === 'active-route') && this.outlet();
        }

        connectedCallback(...args) {
            super.connectedCallback(...args);

            setTimeout(() => {
                this.outlet();
            });
        }

        outlet() {
            Array.from(this.querySelectorAll(`[route]`)).map((active) => {
                active.style.display = "none";
            });
            Array.from(this.shadowRoot.querySelectorAll(`[route]`)).map((active) => {
                active.style.display = "none";
            });
            if (this.activeRoute) {
                Array.from(this.querySelectorAll(`[route~=${this.activeRoute}]`)).map((active) => {
                    active.style.display = "";
                });
                Array.from(this.shadowRoot.querySelectorAll(`[route~=${this.activeRoute}]`)).map((active) => {
                    active.style.display = "";
                });
            }
        }
    };
}

export { navigator, outlet, router };
