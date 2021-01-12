/*
 *  Scripts - Router - Main
 */
import { LitElement, css, unsafeCSS } from '../../modules/lit-element.js';
import { router } from '../../modules/lit-element-router.js';
import { RouterOutlet } from './Outlet.js';
import routes from '../config/routes.js';
import { generic } from '../styles/generic.js';
import { logoResponsive } from '../styles/logoResponsive.js';
customElements.define('c-router-outlet', RouterOutlet);
export class Router extends router(LitElement) {
  static get styles() {
    return [generic, logoResponsive, css`
        :host {
          display: block;
          height: auto;
          padding-bottom: var(--footer-height);
          position: relative;
          width: 100%;
          z-index: 1;
        }
      `];
  }

  static get routes() {
    return routes;
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};
    this.handleLoad = this.handleLoad.bind(this);
    this._preloadRoute = this._preloadRoute.bind(this);
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query; // console.log(route, params, query, data)
  }

  connectedCallback() {
    super.connectedCallback();

    this._getLinks();

    this._setActiveRouteEl();

    this._addOutlet();

    this.loaderEl.enable();
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

  _setActiveRouteEl() {
    this.routeEls.forEach(el => {
      const name = el.getAttribute('route');

      if (name === this.route) {
        el.setAttribute('active', true);
        this.activeRouteEl = el;
      } else {
        if (el.hasAttribute('active')) {
          el.removeAttribute('active');
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
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  handleLoad(e) {
    // console.log('router loading ' + e)
    this.loaderEl.disable();
    this.activeRouteEl.style.opacity = '1';
    this.activeRouteEl.style.transition = 'opacity .5s';
    this.outletEl.setAttribute('active-route', this.route);
  }

  _preloadRoute(e) {
    console.log('preload ' + this._unloadedRouteEls[0]);
    this._unloadedRouteEls[0].loaded = true;

    this._unloadedRouteEls[0].removeEventListener('routeLoad', this._preloadRoute);

    this._preloadRoutes();
  }

  _preloadRoutes() {
    this._unloadedRouteEls = [];
    this.routeEls.forEach(el => {
      if (!el.loaded) {
        this._unloadedRouteEls.concat(el);
      }
    });

    if (this._unloadedRouteEls.length) {
      this._unloadedRouteEls[0].addEventListener('routeLoad', this._preloadRoute);

      this._unloadedRouteEls[0].handleLoad();

      this._unloadedRouteEls[0].preload();

      console.log('Trying to preload' + this._unloadedRouteEls[0]);
    }
  }

  updated() {
    // console.log('router-updated')
    if (this.activeRouteEl) {
      this.activeRouteEl.removeEventListener('routeLoad', this.handleLoad);
    }

    this._setActiveRouteEl();

    window.requestAnimationFrame(() => {
      this.activeRouteEl.style.opacity = '0';
      this.activeRouteEl.style.transition = 'opacity .5s';
    });

    if (this.activeRouteEl.loaded !== true) {
      console.log('Active route not loaded ...');
      this.activeRouteEl.addEventListener('routeLoad', this.handleLoad);
      console.log(this.activeRouteEl);
      this.activeRouteEl.preload();
      this.activeRouteEl.handleLoad();
    } else {
      requestAnimationFrame(() => {
        this.activeRouteEl.style.opacity = '1';
      });
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.activeRouteEl._transitionIn();
        });
      }, 500);

      this._preloadRoutes();
    }

    this.outletEl.setAttribute('active-route', this.route);
    this.navEl.setAttribute('active', '/' + this.route);

    this._resize();

    setTimeout(() => {
      this._resize();
    }, 500);
    setTimeout(() => {
      this._resize();
    }, 1000);
    setTimeout(() => {
      this._resize();
    }, 1500);
    setTimeout(() => {
      this._resize();
    }, 2000);
  }

}