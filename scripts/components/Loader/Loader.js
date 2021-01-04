/*
 *  Scripts - Components - Loader */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class Loader extends LitElement {
  static get styles() {
    return css`

      :host {
        align-content: center;
        background-color: white;
        display: grid;
        grid-template-columns: 60%;
        height: 100%;
        justify-content: center;
        left: 0;
        overflow: hidden;
        position: fixed;
        top: 0;
        transition: opacity .5s;
        width: 100%;
        z-index: 10;
      }

      :host::before {
        background-image: url(/images/Loader.jpg);
        background-position: center center;
        background-size: cover;
        content: '';
        display: grid;
        filter: url('/images/Filters.svg#blur');
        height: 100%;
        left: -10vw;
        position: fixed;

        top: 0;
        width: 120vw;
        z-index: -1;
      }

      .c-loader__content {
        display: grid;
        margin-left: auto;
        margin-right: auto;
        max-width: 12rem;
        row-gap: 2rem;
      }

      .c-loader__bar {
        background-color: rgba(0,0,0,.8);
        height: .4rem;
        overflow: hidden;
        width: 100%;
      }

      .c-loader__bar::after {
        animation: load 1s infinite;
        background-color: white;
        content: '';
        display: block;
        height: 100%;
        width: 20%;
      }

      .c-filters {
        display: block;
        height: 0;
      }

      @keyframes load {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(500%);
        }
      }

    `;
  }

  static get properties() {
    return {
      loaded: {
        type: Boolean,
        attribute: true
      }
    };
  }

  firstUpdated() {}

  updated(changedProperties) {
    if (this.loaded === true) {
      this.shadowRoot.host.style.opacity = 0;
      setTimeout(() => {
        this.shadowRoot.host.style.display = 'none';
      }, 500);
    }
  }

  render() {
    return html`
      <div class="c-loader__inner">
        <div class="c-loader__content">
          <img src='/images/Branding/Logo Initials - Light.svg' />
          <div class="c-loader__bar">
          </div>
        </div>
      </div>

    `;
  }

}