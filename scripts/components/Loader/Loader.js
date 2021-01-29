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
            --color-bg-inverse
          );
          display: var(--loader-display);

          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          height: 100vh;
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

        .c-loader__content {
          display: grid;
          margin-left: auto;
          margin-right: auto;
          row-gap: 3rem;
          width: 100%;
        }

        .c-loader__branding{
          margin-left: auto;
          margin-right: auto;
          width: 8rem;
        }

        .c-loader__bar,
        .c-loader__bar::after {
          background-position:
            center 67%,
            center 45%;
          background-repeat: no-repeat;
          background-size:
            auto 3%,
            auto 25%;
        }

        @media(min-width: 60rem) {

          .c-loader__bar,
          .c-loader__bar::after {
            background-position:
              center 67.5%,
              center 40%;
            background-repeat: no-repeat;
            background-size:
              auto 1.5rem,
              auto 30%;
          }

        }

        .c-loader__bar {
          background-image:
            url('/images/Branding/Logo Initials - Subtle Light.svg'),
            url('/images/Vector/Trace Legit Solid Dark.svg');
          display: grid;
          height: 100vh;
          justify-content: center;
          overflow: hidden;
          width: 100vw;
          -webkit-transform: translate3d(0,0,0)
        }

        .c-loader__bar::after {
          background-color: #E4E5E7;
          /*background-image:
            url('/images/Vector/Trace Legit Solid Subtle.svg');
          */
            background-image:
            url('/images/Branding/Logo Initials - Subtle Dark.svg'),
            url('/images/Vector/Trace Profile Image Subtle.jpg');
          clip-path: polygon(
            0 0,
            var(--loader-progress) 0,
            calc(var(--loader-progress) - 20%) 100%,
            0% 100%
          );
          content: '';
          display: block;
          height: 100%;
          opacity: 1;
          position: absolute;
          transition: all 4s ease;
          width: 100%;
          will-change: clip-path;
        }


        .c-filters {
          display: block;
          height: 0;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes load {
          0% {
            clip-path: polygon(
                0%   0%,
                0%   0%,
                0% 100%,
                0% 100%
            );
          }
          100% {
            clip-path: polygon(
                0%   0%,
              100%   0%,
              100% 100%,
                0% 100%
            );          }
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
    this.duration = 1000;
    this.progress = 0;
    this.throttle = 500;
    this.currentProgress = 0;
    this.currentTime = 0;
  }

  firstUpdated() {
    this.enable();
    document.documentElement.style.setProperty('--loader-duration', this.duration / 1000 + 's');
    document.documentElement.dataset.loaderDuration = this.duration;
    this.shadowRoot.host.style.setProperty('--loader-progress', '0%');
  }

  updated() {
    if (this.progress < 75) {
      window.requestAnimationFrame(time => {
        if (this.currentTime === 0) {
          this.currentTime = time;
        }

        if (this.progress - this.currentProgress > 10 && time - this.currentTime > 400) {
          this.shadowRoot.host.style.setProperty('--loader-progress', this.progress + '%');
          this.currentProgress = this.progress;
        }
      });
    }

    if (this.progress >= 80) {
      this.setComplete();
    }
  }

  setComplete() {
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.shadowRoot.host.style.setProperty('--loader-progress', 100 + '%');
        this.progress = 100;
      });
    }, 200);
  }

  enable() {
    this.enabled = true;
    document.documentElement.style.setProperty('--loader-display', 'grid');
    document.documentElement.style.setProperty('--loader-opacity', '1');
    document.documentElement.classList.add('u-prevent-scroll');
  }

  disable() {
    this.enabled = false;
    this.setComplete();
    setTimeout(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--loader-opacity', '0');
      });
      requestAnimationFrame(() => {
        if (document.documentElement.classList.contains('u-prevent-scroll')) {
          document.documentElement.classList.remove('u-prevent-scroll');
        }

        document.documentElement.style.setProperty('--loader-display', 'none');
      });
      setTimeout(() => {
        requestAnimationFrame(() => {
          document.documentElement.style.position = '';
          document.documentElement.style.overflowY = '';
          document.documentElement.style.setProperty('--loader-display', 'none');
        });
        this.dispatchEvent(new CustomEvent('loaderDisabled'));
      }, 600);
    }, 1600);
  }

  render() {
    return html`
      <div class="c-loader__inner">
        <div class="c-loader__content">
          <div class="c-loader__bar">

          </div>
        </div>
      </div>

    `;
  }

}