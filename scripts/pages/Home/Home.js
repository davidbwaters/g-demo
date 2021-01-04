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
        padding-bottom: 6rem;
        padding-top: calc(6rem + 3rem);
        row-gap: 4rem;
        text-align: center;
        width: 80%;
      }

      @media (min-width:45em) {

        .c-hero-frame__content {
          align-content: center;
          display: grid;
          grid-template-columns: 33% 67%;
          grid-template-rows: min-content min-content;
          width: 100%;
        }

        .c-hero-frame__content:first-child {
          padding-left: 3rem;
        }
      }



      .c-hero-frame__image {
        filter: url('#blur');
      }

      @media (min-width:45em) {

        .c-hero-frame__image {
          max-width: none;
          width: 110%;
        }

      }

      .c-hero-frame__text {
        color: var(--color-subtle-dark-3);
      }

      @media (min-width:45em) {

        .c-hero-frame__text {
          font-weight: var(--font-bolder-weight);
          grid-column: 1 / span 2;
          padding-left: 10%;
          padding-right: 10%;
        }

      }

      .c-hero-frame__background {
        position: fixed;
        height: 100vh;
        left: 0;
        overflow: hidden;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      .c-hero-frame__background::before {
        background-color: var(--hero-frame-color);
        content: '';
        display: block;
        height: 300vh;
        position: absolute;
        left: 50%;
        top: -100vh;
        transform:
          rotate(var(--hero-frame-angle))
          translateY(0)
          translateX(0);
        transform-origin: center left;
        transition: background-color var(--transition-duration);
        width: 400vw;
        will-change: transform , background-color;
        z-index: 0;
      }

      .c-exterior-section {
        align-content: center;
        background-color: var(--color-subtle-light-6);
        display: grid;
        grid-template-columns: 80%;
        justify-content: center;
        padding-bottom: 6rem;
        padding-top: 6rem;
        row-gap: 2rem;
        text-align: center;
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
          <div class="u-text-align-right">
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
            >
            </c-heading>
            <p>
              ${this.data.HeroText}
            </p>
          </div>


        </div>
        <c-angle-section
          data=${JSON.stringify(this.data.HeroAngleBG)}
        >
        </c-angle-section>
      </section>
      <c-scale-section
        data=${JSON.stringify(this.data.ScaleSection1)}
      >
      </c-scale-section>
      <c-scale-section
        data=${JSON.stringify(this.data.ScaleSection2)}
        small="true"
        backgroundColor = "gray"
      >
      </c-scale-section>
      <c-scale-section
        data=${JSON.stringify(this.data.ScaleSection3)}
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
        data=${JSON.stringify(this.data.ScaleSection4)}
      >
      </c-scale-section>

      <div class="c-exterior-section">
        <c-heading
          data=${JSON.stringify(this.data.ExteriorHeading)}
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