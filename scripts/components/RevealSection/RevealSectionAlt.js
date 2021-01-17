/*
 *  Scripts - Components - Reveal Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { initialize } from '../../styles/initialize.js';
import * as basicScroll from '../../../modules/basicscroll.js';
export class RevealSection extends LitElement {
  static get styles() {
    return [initialize, css`

        :host {
          display: block;
        }

        .c-reveal-section__content {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 90vh;
          justify-content: center;
          overflow: hidden;
        }

        .c-reveal-section__upper,
        .c-reveal-section__lower {
          display: grid;
        }

        .c-reveal-section__upper {
          align-content: end;
          grid-template-areas: "image bars";
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          justify-content: center;
        }

        .c-reveal-section__lower {
          align-content: center;
          grid-template-columns: minmax(80%, 60rem);
          justify-content: center;
        }

        .c-reveal-section__upper-background,
        .c-reveal-section__lower-background {
          grid-area: 1 / 1 / span 1 / span 1;
          object-fit: cover;
          position: relative;
          z-index: -1;
        }

        .c-reveal-section__bars {
          display: grid;
          grid-area: 1 / 1 / span 1 / span 1;
          grid-template-columns: 15% 15%;
          grid-template-rows: 1fr;
          justify-content: space-between;
        }

        .c-reveal-section__bars::before,
        .c-reveal-section__bars::after {
          content: '';
          background-color: white;
          transform: scaleX(
            var(--reveal-section-bar-size)
          );
          will-change: transform;
        }

        .c-reveal-section__bars::before {
          left: 0;
          transform-origin: left center;
        }

        .c-reveal-section__bars::after {
          right: 0;
          transform-origin: right center;
        }

        .c-reveal-section__text {
          max-width: 60rem;
          opacity: var(--reveal-section-text-opacity);
          transition: opacity 1s ease-in;
          will-change: opacity;
        }
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
  }

  firstUpdated() {
    this._contentEl = this.shadowRoot.querySelector('.c-reveal-section__content');
    this._barsEl = this.shadowRoot.querySelector('.c-reveal-section__bars');
    this._lowerEl = this.shadowRoot.querySelector('.c-reveal-section__lower');
    this.shadowRoot.querySelector('c-heading').text = this.data.RevealText;

    this._scrollSetup();

    this._scrollInstance.start();
  }

  _scrollSetup() {
    this._scrollInstanceBars = basicScroll.create({
      elem: this._barsEl,
      from: 'top-top',
      to: 'middle-top',
      direct: this._barsEl,
      props: {
        '--reveal-section-bar-size': {
          from: 1,
          to: 0
        }
      }
    });
    this._scrollInstanceFade = basicScroll.create({
      elem: this._lowerEl,
      from: 'top-top',
      to: 'bottom-top',
      direct: this._lowerEl,
      inside: (instance, percentage, props) => {
        if (percentage > 10) {
          if (this.hasScrolled !== true) {
            this.hasScrolled = true;
            this.shadowRoot.host.style.setProperty('--reveal-section-text-opacity', 0.99);
          }
        } else {
          if (this.hasScrolled !== false) {
            this.hasScrolled = false;
            this.shadowRoot.host.style.setProperty('--reveal-section-text-opacity', 0.01);
          }
        }
      }
    });
  }

  render() {
    return html`
      <div
        class="c-reveal-section__content"
      >
        <div
          class="c-reveal-section__upper"
        >
          <div
          class="c-reveal-section__upper-background"
          >
            <img
              src=${this.url + this.data.UpperImage.url}
            >
          </div>
          <div
            class="c-reveal-section__bars"
          >
          </div>
        </div>
        <div
          class="c-reveal-section__lower"
        >

          <div
            class="c-reveal-section__lower-background"
          >
            <img
              src=${this.url + this.data.LowerImage.url}
            >
          </div>
          <div
            class="c-reveal-section__text"
          >
            <c-heading
              color='white'
              size='huge'

            >
            </c-heading>
          </div>
        </div>
      </div>
    `;
  }

}