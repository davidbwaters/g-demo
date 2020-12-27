/*
 *  Scripts - Router - Main
 */
import { LitElement, html, css } from '../../modules/lit-element.js';
import { router } from '../../modules/lit-element-router.js';
import { RouterOutlet } from './Outlet.js';
import routes from '../config/routes.js';
customElements.define('router-outlet', RouterOutlet);
export class Router extends router(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        position: relative;
        width: 100%;
        z-index: 1;
      }
    `;
  }

  static get properties() {
    return routes;
  }

  static get routes() {
    return [{
      name: 'home',
      pattern: '*',
      data: {
        title: 'Home'
      }
    }, {
      name: 'contact',
      pattern: 'contact'
    }];
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    console.log(route, params, query, data);
  }

  connectedCallback() {
    super.connectedCallback();

    this._addOutlet();
  }

  _addOutlet() {
    const links = routes.map(route => {
      let link;

      if (route.component) {
        const el = document.createElement(route.component);
        el.setAttribute('route', route.name);
        link = el;
      }

      if (link) {
        return link;
      }
    });

    if (links.length) {
      const outletEl = document.createElement('router-outlet');
      outletEl.setAttribute('active-route', this.route);
      this.shadowRoot.appendChild(outletEl);
      links.forEach(link => {
        outletEl.appendChild(link);
      });
    }
  }

}