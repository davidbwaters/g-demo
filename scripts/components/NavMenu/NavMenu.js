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
        font-size: var(--text-size-normal);
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
        z-index: 1;
      }

      @media (min-width:45em) {
        :host {
          padding-left: 1.25rem;
          padding-right: 1.25rem;
        }
      }

      a,
      a:visited {
        color: inherit;
        font-family: var(--font-main);
        font-weight: bold;
        text-decoration: none;
      }

      ::slotted(*) {

      }

    `;
  }

  firstUpdated() {
    this.routes = routes;
    this.menuEl = this.shadowRoot.querySelector('.c-nav-menu__links');

    this._addRouterLinks();
  }

  _addRouterLinks() {
    this.routes.map(route => {
      if (route.navTitle && route.navLink) {
        const linkEl = document.createElement('c-router-link');
        linkEl.setAttribute('route', route.navLink);
        linkEl.innerText = route.navTitle;

        if (!this.routerLinkWrapperEl) {
          const wrapperEl = document.createElement('div');
          wrapperEl.classList.add('c-nav-menu__c-router-links');
          wrapperEl.dataset.routerLinks = '';
          this.menuEl.appendChild(wrapperEl);
          this.routerLinkWrapperEl = wrapperEl;
        }

        this.routerLinkWrapperEl.appendChild(linkEl);
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
            <slot name="link"></slot>
          </div>
        </nav>
    `;
  }

}