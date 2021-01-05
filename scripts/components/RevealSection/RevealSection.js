/*
 *  Scripts - Components - Reveal Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js'; // import animateweb from 'animate.web'

import { lerp // invlerp,
// clamp
} from '../../utils/lerp.js';
import { motionBlur } from '../../utils/motionBlur.js';
import { getColor } from '../../utils/theme.js';
export class RevealSection extends LitElement {
  static get styles() {
    return css`

      :host {
        display: grid;
        min-height: 90vh;
        width: 100%;
      }


      .c-reveal-section__content {
        height: 300vh;
        position: relative;
        width: 100%;
      }

      .c-reveal-section__content-upper,
      .c-reveal-section__content-lower {
        background-size: cover;
        background-position: center center;
        height: 100vh;
        width: 100%;
      }

      .c-reveal-section__content-upper {
        background-image:
          var(--reveal-section-upper-bg-image);
        position: sticky;
        top: 0;
      }

      .c-reveal-section__content-lower {
        align-content: center;
        background-image:
          var(--reveal-section-lower-bg-image);
        display: grid;
        grid-template-columns: 90%;
        justify-content: center;
        position: relative;
        top: 100vh;
      }

      .c-reveal-section__bars {
        height: 100%;

      }

      .c-reveal-section__bars::before,
      .c-reveal-section__bars::after {
        content: '';
        background-color: white;
        height: 100vh;
        position: absolute;
        transform: scaleX(var(--reveal-section-bar-size));
        width: 30%;
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
        opacity: var(--reveal-section-text-opacity);
        transition: opacity 1s ease-in;
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
    this.shadowRoot.host.style.setProperty('--reveal-section-upper-bg-image', 'url(' + this.url + this.data.UpperImage.url + ')');
    this.shadowRoot.host.style.setProperty('--reveal-section-lower-bg-image', 'url(' + this.url + this.data.LowerImage.url + ')');
    this.shadowRoot.querySelector('c-heading').text = this.data.RevealText;

    this._scrollSetup();

    this._scrollInstance.start();
  }

  _scrollSetup() {
    this._scrollInstance = basicScroll.create({
      elem: this,
      from: 'top-top',
      to: 'middle-top',
      direct: this,
      props: {
        '--reveal-section-bar-size': {
          from: 1,
          to: 0
        }
      },
      outside: (instance, percentage, props) => {
        if (percentage > 140) {
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
          class="c-reveal-section__content-upper"
        >
          <div
            class="c-reveal-section__bars"
          >
          </div>
        </div>
        <div
          class="c-reveal-section__content-lower"
        >
          <c-heading
            color='white'
            size='large'
            class="c-reveal-section__text"
          >
          </c-heading>
        </div>
      </div>
    `;
  }

}