/*
 *  Scripts - Components - Nav Menu
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { routes } from '../../config/routes.js';
export class NavMenu extends LitElement {
  static get styles() {
    return css`

      :host {
        background-color: var(--color-subtle-dark-2);
        height: 3rem;
        opacity: var(--navbar-opacity);
        pointer-events: var(--navbar-pointer-events);
        position: absolute;
        top: 0;
        transition: all .5s;
        width: 100%;
        will-change: opacity;
        z-index: 9;
      }

      .c-nav-menu__inner {
        align-items: center;
        color: white;
        display: grid;
        grid-column-gap: 1rem;
        grid-template-columns: min-content min-content;
        grid-template-rows: 1rem;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
        max-width: 60rem;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 1rem;

        --nav-menu-column-gap: 1rem;
      }

      .c-nav-menu__links {
        color: var(--color-subtle-light-3);
        column-gap: var(--nav-menu-column-gap);
        display: grid;
        font-size: .8rem;
        font-weight: var(--font-lighter-weight);
        letter-spacing: .05em;
        transition: color .25s;
      }

      .c-nav-menu__router-links,
      .c-nav-menu__anchor-links {
        column-gap: var(--nav-menu-column-gap);
        display: grid;
        grid-auto-flow: column;
      }

      c-router-link.is-active {
        color: var(--color-subtle-light-6);
      }

      a,
      a:visited {
        color: inherit;
        text-decoration: none;
      }

      a:hover {
        color: var(--color-subtle-light-5);
      }


    `;
  }

  static get properties() {
    return {
      active: {
        type: String,
        reflect: true
      }
    };
  }

  firstUpdated() {
    this.routes = routes;
    this.menuEl = this.shadowRoot.querySelector('.c-nav-menu__links');

    this._addRouterLinks();

    this.routerLinkEls = this.shadowRoot.querySelectorAll('c-router-link');
  }

  _addRouterLinks() {
    this.routes.map(route => {
      if (route.navTitle && route.navLink) {
        const linkEl = document.createElement('c-router-link');
        linkEl.setAttribute('href', route.navLink);
        linkEl.innerText = route.navTitle;

        if (!this.routerLinkWrapperEl) {
          const wrapperEl = document.createElement('div');
          wrapperEl.classList.add('c-nav-menu__router-links');
          wrapperEl.dataset.routerLinks = '';
          this.menuEl.appendChild(wrapperEl);
          this.routerLinkWrapperEl = wrapperEl;
        }

        this.routerLinkWrapperEl.appendChild(linkEl);
      }
    });
  }

  updated() {
    this.routerLinkEls.forEach(el => {
      if (el.href === this.active) {
        if (!el.classList.contains('is-active')) {
          el.classList.add('is-active');
        }
      } else {
        if (el.classList.contains('is-active')) {
          el.classList.remove('is-active');
        }
      }
    });
  }

  render() {
    return html`
      <div class="c-nav-menu__inner">
        <slot name="branding"></slot>

        <nav class="c-nav-menu__links">
          <div
            class="c-nav-menu__anchor-links"
          >
          </div>
        </nav>
      </div>
    `;
  }

}