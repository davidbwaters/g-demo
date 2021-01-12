/*
 *  Scripts - Pages - Home
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
import { motionBlur } from '../../utils/motionBlur.js';
import { generic } from '../../styles/generic.js';
import { heroFrame } from '../../styles/heroFrame.js';
export class HomePage extends LitElement {
  static get styles() {
    return [heroFrame, generic, css`
        :host {
          display: block;
          font-size: calc(var(--text-size-normal) * .9);
          line-height: var(--line-height-text-normal);
          min-height: 100%;
          position: relative;
          width: 100%;
        }


        @media (min-width:40em) {

          :host {
            font-size: var(--text-size-normal);
          }

        }

        .c-exterior-section {
          align-content: center;
          background-color: var(--color-subtle-light-5);
          display: grid;
          grid-template-columns: 80%;
          justify-content: center;
          padding-bottom: 8rem;
          padding-top: 8rem;
          row-gap: 1rem;
        }


        .c-exterior-section__content {
          align-items: start;
          column-gap: 4rem;
          display: grid;
          grid-template-columns: 1fr;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          max-width: 60rem;
          padding-top: 4rem;
          row-gap: 4rem;
        }

        @media (min-width:60em) {

          .c-exterior-section__content {
            align-items: start;
            column-gap: 3rem;
            display: grid;
            grid-template-columns: 3fr 2fr;
          }

        }

        .c-exterior-section__text {
          margin-left: auto;
          margin-right: auto;
        }

        .c-filters {
          display: block;
          height: 0;
        }

        @keyframes fade-in {
          0% {
            opacity: 0
          }
          100% {
            opacity: 1
          }
        }

        @keyframes fade-out {
          0% {
            opacity: 1
          }
          100% {
            opacity: 0
          }
        }
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      loaded: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
    this.handleLoad = this.handleLoad.bind(this);
  }

  firstUpdated() {
    this.blurFilter = document.querySelector('c-router-app').shadowRoot.querySelector('c-router-outlet').querySelector('c-home-page').shadowRoot.querySelector('#blur').querySelector('feGaussianBlur');
  }

  preload() {
    if (!this.data) {
      console.log('No data yet ...');
      setTimeout(() => {
        this.preload();
      }, 500);
    } else {
      this.shadowRoot.querySelector('.c-hero-frame__image').addEventListener('load', () => {
        this.loaded = true;
      });
    }
  }

  handleLoad() {
    if (this.loaded === true) {
      this._transitionIn();

      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
    } else {
      setTimeout(() => {
        this.handleLoad();
      }, 200);
    }
  }

  _transitionIn() {
    this.blurFilter.setAttribute('stdDeviation', '10,0');
    setTimeout(() => {
      this._blurAnimation();
    }, 500);
  }

  _blurAnimation() {
    motionBlur(this.blurFilter);
  }

  async _getData() {
    const response = await fetch(this.url + '/home').then(res => res.json()).catch(err => console.error(err));
    return {
      statusCode: 200,
      body: response
    };
  }

  async performUpdate() {
    const data = await this._getData(data => {
      this.data = data;
    });
    this.data = data.body;
    super.performUpdate();
  }

  render() {
    return html`
      <section class="c-hero-frame">
        <div class="c-hero-frame__content">
          <div class="c-hero-frame__branding">
            <img
              src="${this.url + this.data.HeroLogo.url}"
              alt="${this.url + this.data.HeroLogo.alternativeText}"
            />
            <c-slant-title
              data=${JSON.stringify(this.data.HeroSlantTitle)}
            >
            </c-slant-title>
          </div>
          <img
            src="${this.url + this.data.HeroImage.url}"
            alt="${this.url + this.data.HeroImage.alternativeText}"
            class="c-hero-frame__image"
          />
          <div
            class="c-hero-frame__text"
          >
            <c-heading
              text=${this.data.HeroHeading}
              textAlign='center'
              weight=normal'
            >
            </c-heading>
            <c-text-block
              content=${this.data.HeroText}
              backgroundColor='transparent'
              isFlush=true
            >
            </c-text-block>
            <div class="u-text-title">
              ${this.data.HeroSubHeading}
            </div>
          </div>
        </div>

        <c-angle-section
          data=${JSON.stringify(this.data.HeroAngleBG)}
        >
        </c-angle-section>
      </section>

      <c-reveal-section
        data=${JSON.stringify(this.data.RevealSection1)}
      >
      </c-reveal-section>
      <c-scale-section
        data=${JSON.stringify(this.data.ScaleSection1)}
        small=true
        headingTextAlign=left
      >
      </c-scale-section>
      <c-text-block
        data=${JSON.stringify(this.data.TextBlock1)}
      >
      </c-text-block>
      <c-fade-transition
        data=${JSON.stringify(this.data.FadeAnimation)}
      >
      </c-fade-transition>
      <c-heading-section
        data=${JSON.stringify(this.data.HeadingSection1)}
      >
      </c-heading-section>

      <c-scale-section
        data=${JSON.stringify(this.data.ScaleImage1)}
      >
      </c-scale-section>
      <div class="c-exterior-section">
        <c-heading
          data=${JSON.stringify(this.data.ExteriorHeading)}
          class="c-exterior-section__text"
        ></c-heading>
        <img
          src=${this.url + this.data.ExteriorImage.url}
          alt=${this.url + this.data.ExteriorImage.alternativeText}
        />
        <div class="c-exterior-section__content">
          <c-text-block
            data=${JSON.stringify(this.data.ExteriorText)}
            backgroundColor="transparent"
            isFlush=true
          >
          </c-text-block>
          <c-details
            data=${JSON.stringify(this.data.ExteriorDetails)}
            class="c-exterior-section__details"
          >
          </c-details>
        </div>
      </div>
      <c-contact-form
          data=${JSON.stringify(this.data.ContactForm)}
        >
      </c-contact-form>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        class="c-filters"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10,0" />
          </filter>
        </defs>
      </svg>
    `;
  }

}