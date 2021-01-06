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
        padding-top: calc(4rem + 3rem);
        padding-bottom: 4rem;
        row-gap: 4rem;
        text-align: left;

        width: 100%;
        will-change: opacity;
      }

      @media (min-width:40em) {

        .c-hero-frame__content {
          align-content: center;
          display: grid;
          grid-template-rows: min-content min-content;
          padding-bottom: 6rem;
          padding-left: 0;
          padding-right: 0;
          padding-top: calc(5rem + 3rem);
          row-gap: 0rem;
          width: 100%;
        }

      }

      @media (min-width:60em) {

        .c-hero-frame__content {
          padding-bottom: 8rem;
          row-gap: 0rem;
        }

      }

      .c-hero-frame__branding {
        margin-left: auto;
        margin-right: auto;
        opacity: var(--loader-fade-in-opacity);
        padding-left: 0%;
        padding-right: 15%;
        transition:
          opacity var(--loader-fade-in-transition);
        will-change: opacity;
      }

      @media (min-width:40em) {

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
        margin-left: auto;
        margin-right: auto;
        opacity: var(--hero-image-opacity);
        transition: opacity .5s;
        width: 80%;
        will-change: opacity;
      }

      @media (min-width:40em) {

        .c-hero-frame__image {
          margin-top: -2rem;
          max-width: none;
          padding-left: 33%;
          width: 100%;
        }

      }

      .c-hero-frame__text {
        margin-left: auto;
        margin-right: auto;
        max-width: 60rem;
        padding-left: 5%;
        padding-right: 5%;
        text-align: center;
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
          margin-bottom: .75rem;
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

      @media (min-width:60em) {

        .c-exterior-section__content {

        }
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

      @media (min-width:40em) {

        .c-exterior-section__content {
        }

      }

      @media (min-width:60em) {

        .c-exterior-section__content {
          align-items: start;
          column-gap: 2rem;
          display: grid;
          grid-template-columns: 3fr 2fr;
        }

      }

      .c-exterior-section__text {
        margin-bottom:
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
        data=${JSON.stringify(this.data.ScaleSection2)}
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