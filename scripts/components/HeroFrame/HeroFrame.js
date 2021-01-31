/*
 *  Scripts - Components - Hero Frame
 */
import { html, css } from '../../../modules/lit-element.js';
import { Component } from '../../bases/Component.js';
import { remote } from '../../config/remote.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class HeroFrame extends Component {
  static get styles() {
    return [initialize, objects, utilities, css`

        :host {
          display: block;
          height: 100%;
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .c-hero-frame {
          position: relative;
          overflow: hidden;
        }

        .c-hero-frame__upper {
          align-content: start;
        }

        .c-hero-frame__large-text-media-block {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 2rem;
        }

        .c-hero-frame__content {
          justify-content: center;
          text-align: center;
          will-change: opacity;
        }

        .c-hero-frame__branding {
          margin-left: 10%;
          margin-right: 10%;
          min-width: 16rem;
          transition:
          opacity var(--loader-fade-in-transition);
          will-change: opacity;
        }

        @media (min-width:40em) {

          .c-hero-frame__branding {
            margin-left: 0%;
            margin-right: 0%;
            max-width: none;
          }

        }

        .c-hero-frame__large-text-image {
          filter: url('#blurFilterSuper');
          margin-bottom: 0rem;
          margin-left: auto;
          margin-right: auto;
        }


        @media (min-width:40em) {

          .c-hero-frame__large-text-image {
            margin-top: 0rem;
            width: 66%;
          }

        }

        .c-hero-frame__image {
          filter: url('#blurFilterSuper');
          margin-left: 10%;
          opacity: var(--hero-image-opacity);
          transition: opacity .5s;
          will-change: opacity;
          width: 90%;
        }

        @media (min-width:40em) {

          .c-hero-frame__image {
            margin-left: -10%;
            margin-top: 2rem;
            max-width: none;
            width: 110%;
          }

        }

        @media (min-width:40em) {

          .c-hero-frame__text {
            font-weight: var(--font-bolder-weight);
            padding-left: 10%;
            padding-right: 10%;
            padding-top: 3rem;
          }

        }

        @media (min-width:60em) {
          .c-hero-frame__text {
            padding-left: 10%;
            padding-right: 10%;
          }
        }

        .c-hero-frame__text c-text-block {
          margin-bottom: .5rem;
        }

        @media (min-width:40em) {

          .c-hero-frame__text c-text-block {
            margin-bottom: .5rem;
          }

        }

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribue: true
      }
    };
  }

  constructor() {
    super();
    this.url = remote.url;
    this.handleScrollReady = this.handleScrollReady.bind(this);
  }

  firstUpdated() {
    super.addBlurFilter();
    super.blurAnimation();
    this._scrollInstances = [{
      start: () => {
        this.scrollReady ? this._scrollInstance.start() : this.shouldStart = true;
      },
      stop: () => {
        this.scrollReady ? this._scrollInstance.stop() : this.shouldStop = true;
      }
    }];
    this.scrollEl = this.shadowRoot.querySelector('c-angle-background');
    this.scrollEl.addEventListener('scrollReady', this.handleScrollReady);
  }

  blurAnimation() {
    super.addBlurFilter();
    super.blurAnimation();
  }

  handleScrollReady() {
    this.scrollReady = true;
    this._scrollInstance = this.scrollEl.scrollInstance;

    if (this.shouldStart) {
      this._scrollInstance.start();
    }

    if (this.shouldStop) {
      this._scrollInstance.stop();
    }

    this.scrollEl.removeEventListener('scrollReady', this.handleScrollReady);
  }

  render() {
    return html`

      ${!this.data.LargeText ? html`

        <div class="
            o-section-block
            o-section-block--top
          "
        >

          <div class="
            o-media-block
            o-media-block--narrow
            o-media-block--content-spacing-large
            o-media-block--split-flush-end
            c-hero-frame__upper
          ">

            <div class="
              o-media-block__item
            ">
              <img
                src="/images/Branding/Logo - Dark.svg"
                alt="logo"
              />
              <c-slant-title
                color=${this.data.ColorStart}
                text="993 Remastery"
              >
              </c-slant-title>
              <div class="u-text-title-tiny">
                Hand Built by Gunther Werks
              </div>
            </div>

            <div class="
              o-media-block__item
            ">
              <img
                src=${this.url + this.data.Image.url}
                alt=${this.data.alternativeText}
                class="c-hero-frame__image"
              />
            </div>
          </div>

        </div>

        <div class="
            o-section-block
            o-section-block--flush-top
          "
        >
          <div class="
            o-block
            o-block--narrow
            c-hero-frame__content
          ">
            <div
              class="c-hero-frame__text"
            >
              <c-heading
                data=${JSON.stringify(this.data.Heading)}
              >
              </c-heading>
              <c-text-block
                data=${JSON.stringify(this.data)}
              >
              </c-text-block>

            </div>
          </div>

          <c-angle-background
            colorstart=${this.data.ColorStart}
            colorend=${this.data.ColorEnd}
            anglestart=${this.data.AngleStart}
            angleend=${this.data.AngleEnd}
            offsetxstart=${this.data.OffsetXStart}
            offsetxend=${this.data.OffsetXEnd}
            offsetystart=${this.data.OffsetYStart}
            offsetyend=${this.data.OffsetYEnd}
          >
          </c-angle-background>

        </div>
      ` : html`

        <div class="
            o-section-block
            o-section-block--top
          "
        >

          <div class="
            o-block
            c-hero-frame__upper
          ">
            <div class="
            ">
              <c-heading data=${JSON.stringify({
      Text: this.data.LargeText.TextBlock,
      Size: 'Medium'
    })}>
              </c-heading>

            </div>
            <div class="
              c-hero-frame__large-text-image
            ">
              <img
                src=${this.url + this.data.Image.url}
                alt=${this.data.alternativeText}
              />
            </div>
          </div>

        </div>


        <div class="
            o-section-block
            o-section-block--flush-top
          "
        >

          <div class="
            o-block
            o-block--narrow
            c-hero-frame__content
          ">
            <div
              class="c-hero-frame__text"
            >
              <c-heading
                data=${JSON.stringify(this.data.Heading)}
              >
              </c-heading>
              <c-text-block
                data=${JSON.stringify(this.data)}
              >
              </c-text-block>

            </div>
          </div>

          <c-angle-background
            colorstart=${this.data.ColorStart}
            colorend=${this.data.ColorEnd}
            anglestart=${this.data.AngleStart}
            angleend=${this.data.AngleEnd}
            offsetxstart=${this.data.OffsetXStart}
            offsetxend=${this.data.OffsetXEnd}
            offsetystart=${this.data.OffsetYStart}
            offsetyend=${this.data.OffsetYEnd}
          >
          </c-angle-background>

        </div>

      `}
    `;
  }

}