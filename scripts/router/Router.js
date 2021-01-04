/*
 *  Scripts - Router - Main
 */
import { LitElement, html, css } from '../../modules/lit-element.js';
import { router } from '../../modules/lit-element-router.js';
import { RouterOutlet } from './Outlet.js';
import routes from '../config/routes.js';
customElements.define('c-router-outlet', RouterOutlet);
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

      .c-logo-responsive {
        align-content: center;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        min-width: 2.5rem;
        position: relative;
      }

      .c-logo-responsive::after {
        background-image: var(--logo-small-dark);
        background-repeat: no-repeat;
        content: '';
        display: block;
        padding-bottom: calc(
          100% * var(--logo-small-height) / var(--logo-small-width)
        );
        width: 100%;
      }

      @media (min-width:45em) {

        .c-logo-responsive {
          min-width: 4em;
        }

        .c-logo-responsive::after {
          background-image: var(--logo-medium-dark);
          padding-bottom: calc(
            100% *
            var(--logo-medium-height) / var(--logo-medium-width)
          );
        }

      }

      .c-logo-responsive--light::after {
        background-image: var(--logo-small-light);
      }

      @media (min-width:45em) {

        .c-logo-responsive--light::after {
          background-image: var(--logo-medium-light);
        }

      }

      .c-logo-responsive a {
        height: 100%;
        position: absolute;
        width: 100%;
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

        if (route.name === this.route) {
          el.setAttribute('active', true);
        }

        link = el;
      }

      if (link) {
        return link;
      }
    });

    if (links.length) {
      const navEl = document.createElement('c-nav-menu');
      const linkEl = document.createElement('c-router-link');
      const outletEl = document.createElement('c-router-outlet');
      const loaderEl = document.createElement('c-loader');
      linkEl.classList.add('c-logo-responsive');
      linkEl.classList.add('c-logo-responsive--light');
      linkEl.setAttribute('slot', 'branding');
      outletEl.setAttribute('active-route', this.route);
      navEl.appendChild(linkEl);
      this.shadowRoot.appendChild(navEl);
      this.shadowRoot.appendChild(outletEl);
      this.shadowRoot.appendChild(loaderEl);
      links.forEach(link => {
        const isActive = link.getAttribute('active') === 'true';

        if (isActive) {
          link.addEventListener('load', () => {
            loaderEl.setAttribute('loaded', true);
          });
        }

        outletEl.appendChild(link);
      });
    }
  }

}