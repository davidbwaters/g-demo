/*
 *  Scripts - Pages - Home
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
import { motionBlur } from '../../utils/motionBlur.js';
const url = 'https://admin.guntherwerks.info';

async function getData() {
  const response = await fetch(url + '/home').then(res => res.json()).catch(err => console.error(err));
  return {
    statusCode: 200,
    body: response
  };
}

async function load() {
  await this.requestUpdate();
  console.log('...loaded');
}

export class HomePage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-size: 2rem;
        line-height: 1.2;
        min-height: 100%;
        position: relative;
        width: 100%;
      }

      .c-hero-frame {
        position: relative;
        overflow: hidden;
      }

      .c-hero-frame__content {
        align-content: center;
        display: grid;
        grid-auto-flow: row;
        height: 100%;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        padding-top: calc(6rem + 3rem);
        row-gap: 4rem;
        text-align: left;
        width: 100%;
      }

      @media (min-width:45em) {

        .c-hero-frame__content {
          align-content: center;
          display: grid;
          grid-template-rows: min-content min-content;
          padding-left: 0;
          padding-right: 0;
          width: 100%;
        }

      }

      .c-hero-frame__branding {
        margin-left: auto;
        margin-right: auto;
        max-width: 35rem;
        padding-left: 10%;
        padding-right: 10%;
      }

      @media (min-width:45em) {

        .c-hero-frame__branding {
          max-width: none;
          padding-left: 5%;
          padding-right: 55%;
          text-align: right;
          width: 100%;
        }

      }

      .c-hero-frame__image {
        filter: url('#blur');
        opacity: var(--hero-image-opacity);
        transition: opacity .5s;
        width: 80%;
        will-change: opacity;
      }

      @media (min-width:45em) {

        .c-hero-frame__image {
          max-width: none;
          padding-left: 20%;
          width: 100%;
        }

      }

      .c-hero-frame__text {
        background-color: var(--color-subtle-light-6);
        color: var(--color-subtle-dark-3);
        padding-bottom: 6rem;
        padding-left: 5%;
        padding-right: 5%;
        padding-top: 6rem;
      }

      @media (min-width:45em) {

        .c-hero-frame__text {
          font-weight: var(--font-bolder-weight);
          padding-bottom: 8rem;
          padding-left: 5%;
          padding-right: 5%;
          padding-top: 8rem;
        }

      }

      .c-exterior-section {
        align-content: center;
        background-color: var(--color-subtle-light-6);
        display: grid;
        grid-template-columns: 90%;
        justify-content: center;
        padding-bottom: 6rem;
        padding-top: 6rem;
        row-gap: 1rem;
        text-align: center;
      }

      .c-exterior-section__text {
        margin-left: auto;
        margin-right: auto;
        width: 66%;
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
    this.shadowRoot.querySelector('.c-hero-frame__image').addEventListener('load', () => {
      this._loadReady = true;
    });
    const docStyles = document.styleSheets[0];
    const sheet = new CSSStyleSheet();
    const rulesObjs = [...docStyles.rules];
    let rules = [];
    rulesObjs.forEach(rule => {
      if (rule.type === 1) {
        rules = rules.concat(rule.cssText);
      }
    });
    rulesObjs.forEach(rule => {
      if (rule.type === 1) {
        //console.log(rule.cssText)
        sheet.insertRule(rule.cssText);
      }
    }); //console.log(sheet)

    this.shadowRoot.adoptedStyleSheets = [this.shadowRoot.adoptedStyleSheets[0], sheet];

    const handleLoad = () => {
      if (this._loadReady === true) {
        let load = new Event('load');
        this.dispatchEvent(load);
        setTimeout(() => {
          this._blurAnimation();
        }, 500);
      } else {
        setTimeout(() => {
          handleLoad();
        }, 50);
      }
    };

    this.updateComplete.then(() => {
      handleLoad();
      console.log('complete');
    });
  }

  async performUpdate() {
    const data = await getData(data => {
      this.data = data;
    });
    this.data = data.body;
    console.log(this.data);
    super.performUpdate();
  }

  _blurAnimation(filter) {
    const blurFilter = document.querySelector('c-router-app').shadowRoot.querySelector('c-router-outlet').querySelector('c-home-page').shadowRoot.querySelector('#blur').querySelector('feGaussianBlur');
    motionBlur(blurFilter);
  }

  render() {
    return html`
      <section class="c-hero-frame">
        <div class="c-hero-frame__content">
          <div class="c-hero-frame__branding">
            <img
              class="u-margin-bottom-5"
              src="${url + this.data.HeroLogo.url}"
              alt="${url + this.data.HeroLogo.caption}"
            />
            <c-slant-title
              data=${JSON.stringify(this.data.HeroSlantTitle)}
            >
            </c-slant-title>
          </div>
          <img
            src="${url + this.data.HeroImage.url}"
            alt="${url + this.data.HeroImage.caption}"
            class="c-hero-frame__image"
          />
          <div
            class="c-hero-frame__text"
          >
            <c-heading
              text = ${this.data.HeroHeading}
              textAlign = 'left'
            >
            </c-heading>
            <c-text-block
              content=${this.data.HeroText}
              backgroundColor='transparent'
              isFlush=true
            >
            </c-text-block>
          </div>


        </div>
        <c-angle-section
          data=${JSON.stringify(this.data.HeroAngleBG)}

        >
        </c-angle-section>
      </section>
      <c-scale-section
        data=${JSON.stringify(this.data.ScaleSection1)}
        backgroundColor = "gray"
      >
      </c-scale-section>
      <c-scale-section
        data=${JSON.stringify(this.data.ScaleSection2)}
        small=true
      >
      </c-scale-section>
      <c-scale-section
        data=${JSON.stringify(this.data.ScaleSection3)}
      >
      </c-scale-section>
      <c-text-block
        data=${JSON.stringify(this.data.TextBlock1)}
        backgroundColor = "gray"
      >
      </c-text-block>
      <c-fade-transition
        data=${JSON.stringify(this.data.FadeAnimation)}
      >
      </c-fade-transition>
      <c-heading-section
        data=${JSON.stringify(this.data.HeadingSection1)}
        backgroundColor="gray"
      >
      </c-heading-section>
      <c-scale-section
        data=${JSON.stringify(this.data.ScaleSection4)}
      >
      </c-scale-section>

      <div class="c-exterior-section">
        <c-heading
          data=${JSON.stringify(this.data.ExteriorHeading)}
          class="c-exterior-section__text"
        ></c-heading>
        <img
          src=${url + this.data.ExteriorImage.url}
          alt=${url + this.data.ExteriorImage.caption}
        />
        <div class="c-exterior-section__content">

        </div>
      </div>


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