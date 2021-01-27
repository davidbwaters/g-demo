/*
 *  Scripts - Router - Main
 */
import { LitElement, css } from '../../modules/lit-element.js';
import { router } from '../../modules/lit-element-router.js';
import { RouterOutlet } from './Outlet.js';
import { routes } from '../config/routes.js';
import { initialize } from '../styles/initialize.js';
import { logoResponsive } from '../styles/components.logo-responsive.js';
customElements.define('c-router-outlet', RouterOutlet);
export class Router extends router(LitElement) {
  static get styles() {
    return [initialize, logoResponsive, css`
        :host {
          display: block;
          padding-bottom: var(--footer-height);
          position: relative;
          width: 100%;
          z-index: 1;
        }

        .c-page {
          display: block;
          opacity: var(--page-opacity);
          transition:
            opacity var(--transition-duration) ease;
          will-change: opacity;
        }
      `];
  }

  static get properties() {
    return {
      loaderActive: {
        type: Boolean,
        reflect: true
      },
      loadingActiveRoute: {
        type: Boolean,
        reflect: true
      }
    };
  }

  static get routes() {
    return routes;
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {}; //this.debug = true

    this.handleLoad = this.handleLoad.bind(this);
    this.handlePreload = this.handlePreload.bind(this);
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;

    if (this.debug) {
      console.log(route, params, query, data);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this._getLinks();

    this.setActiveRouteEl();

    this._addOutlet();

    this.loaderEl.enable();
    this.loaderEnabled = true;
  }

  _getLinks() {
    this.routeEls = routes.map(route => {
      if (route.component) {
        const el = document.createElement(route.component);
        el.setAttribute('route', route.name);
        return el;
      }
    });
  }

  setActiveRouteEl() {
    this.routeEls.forEach(el => {
      const name = el.getAttribute('route');
      el.shadowRoot.host.style.setProperty('--page-opacity', '0');

      if (name === this.route) {
        el.setAttribute('active', true);
        el.active = true;
        this.activeRouteEl = el;
      } else {
        if (el.hasAttribute('active')) {
          el.removeAttribute('active');
          el.active = false;
        }
      }
    });
  }

  _addBranding() {
    const linkEl = document.createElement('c-router-link');
    linkEl.classList.add('c-logo-responsive');
    linkEl.classList.add('c-logo-responsive--light');
    linkEl.setAttribute('slot', 'branding');
    linkEl.setAttribute('href', '/');
    this.navEl.appendChild(linkEl);
  }

  _addOutlet() {
    if (this.routeEls.length) {
      this.navEl = document.createElement('c-nav-menu');

      this._addBranding();

      this.outletEl = document.createElement('c-router-outlet');
      this.outletEl.setAttribute('active-route', this.route);
      this.routeEls.forEach(el => {
        el.classList.add('c-page');
        this.outletEl.appendChild(el);
      });
      this.footerEl = document.createElement('c-footer');
      this.loaderEl = document.createElement('c-loader');
      this.shadowRoot.appendChild(this.navEl);
      this.shadowRoot.appendChild(this.outletEl);
      this.shadowRoot.appendChild(this.footerEl);
      this.shadowRoot.appendChild(this.loaderEl);
    }
  }

  _resize() {
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }, 500);
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }, 1500);
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }, 2500);
  }

  handlePreload(e) {
    if (this.debug) {
      console.log('preload ' + this._unloadedRouteEls[0]);
    }

    this._unloadedRouteEls[0].setAttribute('loaded', '');

    this._unloadedRouteEls[0].loaded = true;

    this._unloadedRouteEls[0].removeEventListener('preloaded', this.handlePreload);

    this.preloadRoutes();
  }

  preloadRoutes() {
    this._unloadedRouteEls = [];
    this.routeEls.forEach(el => {
      if (!el.hasAttribute('loaded')) {
        this._unloadedRouteEls = this._unloadedRouteEls.concat(el);
      }
    }); // If there are routes that aren't loaded,
    // preload one and listen for when it's done

    if (this._unloadedRouteEls.length) {
      if (!this.loadingActiveRoute) {
        this._unloadedRouteEls[0].addEventListener('preloaded', this.handlePreload);

        this._unloadedRouteEls[0].handlePreload();

        if (this.debug) {
          console.log('Trying to preload ' + this._unloadedRouteEls[0].tagName.toLowerCase());
        }
      }
    }
  }

  handleLoad(e) {
    if (this.debug) {
      console.log('Active route loaded ...');
    }

    if (this.loadingActiveRoute) {
      this.loadingActiveRoute = false;
      this.activeRouteEl.removeEventListener('preloaded', this.handleLoad);
      this.preloadRoutes();
    }

    setTimeout(() => {
      if (this.loaderEnabled) {
        this.loaderEl.disable();
      }

      let active = this.activeRouteEl;
      this.loaderEl.addEventListener('loaderDisabled', () => {
        requestAnimationFrame(() => {
          active.shadowRoot.host.style.setProperty('--page-opacity', '1');
          active.onActivate();
          active.handleLoad();
        });
      });
    }, this.loaderEl.duration * 0.1);
  }

  updated() {
    if (this.debug) {
      console.log('Router updated ...');
    } // Deactivate current route.


    if (this.activeRouteEl !== this.route) {
      this.activeRouteEl.onDeactivate();
    } // Set the active route element.


    this.setActiveRouteEl(); // If the gallery is active, hide footer,
    // if not make sure it's not hidden

    if (this.activeRouteEl.hideFooter) {
      this.footerEl.style.height = '0';
      this._footerHidden = true;
    } else {
      if (this._footerHidden) {
        this.footerEl.style.height = '';
        this._footerHidden = false;
      }
    } // If the active route isn't loaded,
    // enable the loader and add a listener
    // to handle when it loads.
    // If it is, handle loading it and preload
    // other routes


    if (!this.activeRouteEl.loaded) {
      if (this.debug) {
        console.log('Active route loading ...');
      }

      this.loaderEl.progress = 0;
      this.loaderEl.enable();
      this.loaderEnabled = true;
      this.loadingActiveRoute = true;
      this.activeRouteEl.addEventListener('preloaded', this.handleLoad);
      this.activeRouteEl.handlePreload();
    } else {
      this.handleLoad();
      this.preloadRoutes();
    } // Set attributes with active route


    this.outletEl.setAttribute('active-route', this.route);
    this.navEl.setAttribute('active', '/' + this.route); // Fire resize event to workaround scroll issues

    this._resize();
  }

}