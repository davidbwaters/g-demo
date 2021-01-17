/*
 *  Scripts - Components - Loader */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { initialize } from '../../styles/initialize.js';
export class Loader extends LitElement {
  static get styles() {
    return [initialize, css`
        :host {
          align-content: center;
          background-color: var(
            --color-subtle-dark-2
          );
          display: var(--loader-display);
          grid-template-columns: 60%;
          height: 100%;
          justify-content: center;
          left: 0;
          opacity: var(--loader-opacity);
          overflow: hidden;
          position: fixed;
          top: 0;
          transition-duration:
            opacity
            var(--loader-transition-duration);
          width: 100%;
          z-index: 10;
        }

        :host::before {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          content: '';
          display: grid;
          height: 100%;
          left: -10vw;
          opacity: .66;
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

        .c-loader__content img{
          margin-left: auto;
          margin-right: auto;
          width: 60%;
        }

        .c-loader__bar {
          background-color: rgba(0,0,0,.8);
          height: .25rem;
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

      `];
  }

  static get properties() {
    return {
      duration: {
        type: Number
      },
      enabled: {
        type: Boolean,
        reflect: true
      },
      progress: {
        type: Number,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.enabled = true;
    this.duration = 1800;
  }

  firstUpdated() {
    this.enable();
    document.documentElement.style.setProperty('--loader-duration', this.duration / 1000 + 's');
    document.documentElement.dataset.loaderDuration = this.duration;
  }

  disable() {
    this.enabled = false;
    document.documentElement.style.setProperty('--loader-opacity', '0');
    setTimeout(() => {
      document.documentElement.style.position = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.setProperty('--loader-display', 'none');
    }, this.duration);
  }

  enable() {
    this.enabled = true;
    document.documentElement.style.setProperty('--loader-display', 'grid');
    document.documentElement.style.setProperty('--loader-opacity', '1');
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.overflowY = 'scroll';
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