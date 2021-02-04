/*
 *  Scripts - Components - Reveal Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
import { remote } from '../../config/remote.js';
export class RevealSection extends LitElement {
  static get styles() {
    return [objects, utilities, css`

        :host {
          display: block;
          max-width: 100vw;
          position: relative;
          width: 100%;
        }

        .c-reveal-section__upper {
          background-image: var(
            --reveal-section-upper-bg-image
          );
          background-size: auto 100vh;
          background-repeat: no-repeat;
          background-position: top center;
          height: 100vh;
          position: sticky;
          top: 0;
          width: 100%;
        }

        .c-reveal-section__lower {
          align-content: center;
          background-color: var(--color-bg-inverse-contrast);
          display: grid;
          justify-content: center;
          grid-template-columns: 90%;
          height: 100vh;
          justify-content: center;
          margin-top: 50vh;
          position: sticky;
          text-align: center;
          width:100%;
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
          width: 10rem;
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
          color: white;
          position: relative;
        }

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        reflect: false
      }
    };
  }

  constructor() {
    super();
    this.url = remote.url;
  }

  firstUpdated() {
    this._contentEl = this.shadowRoot.querySelector('.c-reveal-section__content');
    this._barsEl = this.shadowRoot.querySelector('.c-reveal-section__bars');
    this._upperEl = this.shadowRoot.querySelector('.c-reveal-section__upper');
    this._lowerEl = this.shadowRoot.querySelector('.c-reveal-section__lower');
    this._lowerBackground = this.shadowRoot.querySelector('.c-reveal-section__lower-background');
    this._upperEl.style.backgroundImage = 'url(' + this.url + this.data.UpperBackgroundImage.url + ')';
    this._lowerBackground.style.backgroundImage = 'url(' + this.url + this.data.LowerBackgroundImage.url + ')';

    this._scrollSetup(); // this._scrollInstanceBars.start()
    // this._scrollInstanceFade.start()


    this.scrollInstances = [this._scrollInstanceBars, this._scrollInstanceFade];
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
          <div class="
            o-section-block
          ">
            <div class="o-block">
            ${this.data.Heading && this.data.Text.length ? html`
                  <c-heading
                    data=${JSON.stringify(this.data.Heading)}
                    color='inherit'
                  >
                  </c-heading>
                  <c-text-block
                    text=${this.data.Text}
                    textboldfont=${this.data.TextBoldFont}
                    textsize=${this.data.TextSize}
                    textlight=${this.data.TextLight}
                    color='inherit'
                  >
                  </c-text-block>
                ` : !this.data.Heading && this.data.Text.length ? html`
                  <c-text-block
                    text=${this.data.Text}
                    textboldfont=${this.data.TextBoldFont}
                    textsize=${this.data.TextSize}
                    textlight=${this.data.TextLight}
                    color='inherit'
                  >
                  </c-text-block>
                ` : this.data.Heading && !this.data.Text.length ? html`
                  <c-heading
                    data=${JSON.stringify(this.data.Heading)}
                    color='inherit'
                  >
                  </c-heading>
                ` : html`
                  <span></span>
                `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

}