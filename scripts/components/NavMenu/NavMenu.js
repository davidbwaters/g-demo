/*
 *  Scripts - Components - Nav Menu
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import routes from '../../config/routes.js';
export class NavMenu extends LitElement {
  static get styles() {
    return css`

      :host {
        align-items: center;
        background-color: var(--color-subtle-dark-2);
        box-sizing: border-box;
        color: white;
        display: grid;
        grid-column-gap: 1rem;
        grid-template-columns: min-content min-content;
        grid-template-rows: 1rem;
        justify-content: space-between;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 1rem;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 9;

        --nav-menu-column-gap: 1rem;
      }

      @media (min-width:40em) {
        :host {
          padding-left: 1.25rem;
          padding-right: 1.25rem;
        }
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

        <slot name="branding"></slot>

        <nav class="c-nav-menu__links">
          <div
            class="c-nav-menu__anchor-links"
          >
          </div>
        </nav>
    `;
  }

}