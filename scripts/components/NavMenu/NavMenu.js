/*
 *  Scripts - Components - Nav Menu
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { routes } from '../../config/routes.js';
import { initialize } from '../../styles/initialize.js';
export class NavMenu extends LitElement {
  static get styles() {
    return [initialize, css`

        :host {

        --logo-small-light: url('/images/Branding/Logo G - Light.svg');
        --logo-small-dark: url('/images/Branding/Logo G - Dark.svg');
        --logo-medium-light: url('/images/Branding/Logo Initials - Light.svg');
        --logo-medium-dark: url('/images/Branding/Logo Initials - Dark.svg');
        --logo-large-light: url('/images/Branding/Logo - Light.svg');
        --logo-large-dark: url('/images/Branding/Logo - Dark.svg');

          background-color: var(--color-bg-inverse);
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
          max-width: calc(
            var(--wrapper-max) +
            (var(--navbar-spacing)  * 2)
          );
          padding-bottom: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 1rem;

          --nav-menu-column-gap: .8rem;
        }

        .c-nav-menu__links {
          color: var(--color-fg-inverse-subtle);
          column-gap: var(--nav-menu-column-gap);
          display: grid;
          font-family: var(--font-title);
          font-size: calc(var(--text-size-small) * .95);
          font-weight: var(--font-weight-title-normal-light);
          letter-spacing: var(--letter-spacing-title-normal-light);
          transition: color .25s;
        }

        @media(min-width:40em) {

          .c-nav-menu__links {
            font-size: calc(var(--text-size-small) * 1);
          }

        }

        .c-nav-menu__router-links,
        .c-nav-menu__anchor-links {
          column-gap: var(--nav-menu-column-gap);
          display: grid;
          grid-auto-flow: column;
        }

        .c-nav-menu__router-links a,
        .c-nav-menu__router-links a:visited {
          opacity: .9;
          color: inherit;
          text-decoration: none;
          transition: all calc(
            var(--transition-duration) * .5
          );
          will-change: color, opacity;
        }

        .c-nav-menu__router-links a:hover {
          color: var(--color-fg-inverse);
        }

        .c-nav-menu__router-links .is-active a {
          color: var(--color-fg-inverse-contrast);
          opacity: 1;
        }


      `];
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