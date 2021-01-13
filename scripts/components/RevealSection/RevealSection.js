/*
 *  Scripts - Components - Reveal Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js';
export class RevealSection extends LitElement {
  static get styles() {
    return css`

      :host,
      .c-reveal-section__content {
        max-width: 100vw;
        overflow: hidden;
        position: relative;
        width: 100%;
      }

      .c-reveal-section__content {
        background-attachment: fixed;
        background-image: var(
          --reveal-section-upper-bg-image
        );
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom center;
        display: grid;
        grid-template-rows: 200vh 100vh;
      }

      .c-reveal-section__bars {
        height: 100%;
      }

      .c-reveal-section__bars::before,
      .c-reveal-section__bars::after {
        content: '';
        background-color: white;
        height: 100%;
        position: absolute;
        transform: scaleX(var(--reveal-section-bar-size));
        width: 15%;
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

      .c-reveal-section__lower {
        align-content: center;
        background-color: var(--color-subtle-dark-1);
        display: grid;
        justify-content: center;
        grid-template-columns: 90%;
        justify-content: center;
        position: relative;
      }


      @media (min-width:40em) {

        .c-reveal-section__lower {
          grid-template-columns: 80%;
        }

      }

      .c-reveal-section__lower-background {
        background-position: bottom center;
        background-size: cover;
        content: '';
        height: 100%;
        opacity: .66;
        position: absolute;
        width: 100%;
      }

      .c-reveal-section__text {
        max-width: 60rem;
        opacity: var(--reveal-section-text-opacity);
        transition: opacity .5s ease-in;
        will-change: opacity;
      }
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      }
    };
  }

  firstUpdated() {
    this.url = 'https://admin.guntherwerks.info';
    this._contentEl = this.shadowRoot.querySelector('.c-reveal-section__content');
    this._barsEl = this.shadowRoot.querySelector('.c-reveal-section__bars');
    this._upperEl = this.shadowRoot.querySelector('.c-reveal-section__upper');
    this._lowerEl = this.shadowRoot.querySelector('.c-reveal-section__lower');
    this._lowerBackground = this.shadowRoot.querySelector('.c-reveal-section__lower-background');
    this._contentEl.style.backgroundImage = 'url(' + this.url + this.data.UpperImage.url + ')';
    this._lowerBackground.style.backgroundImage = 'url(' + this.url + this.data.LowerImage.url + ')';
    this.shadowRoot.querySelector('c-heading').text = this.data.RevealText;

    this._scrollSetup();

    this._scrollInstanceBars.start();

    this._scrollInstanceFade.start();
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
      from: 'top-bottom',
      to: 'bottom-bottom',
      direct: this._lowerEl,
      inside: (instance, percentage, props) => {
        if (percentage > 50) {
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