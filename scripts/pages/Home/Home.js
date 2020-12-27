/*
 *  Scripts - Pages - Home
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
export class HomePage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      /*
      *  Pages - Home
      */

      .c-frame-content__image {
        max-width: 1200px;
        width: 100%;
        will-change: opacity;
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

  firstUpdated() {
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
        console.log(rule.cssText);
        sheet.insertRule(rule.cssText);
      }
    });
    console.log(sheet);
    this.shadowRoot.adoptedStyleSheets = [this.shadowRoot.adoptedStyleSheets[0], sheet];
  }

  render() {
    return html`
      <product-frames>
        <div
          slot="frame"
          data-rotate="-15"
          data-color="blue"
          data-translate-x="0"
          data-translate-y="0"
          data-product-animate-in="fade-in"
          data-product-animate-out="fade-out"
          class="c-frame-content"
        >
          <h1 class="u-text-align-center">
            Modern Classic.
          </h1>
          <img
            data-product
            src="/images/Frames/Blue.png"
            alt="Blue 993"
            class="c-frame-content__image"
          >

        </div>
        <div
          slot="frame"
          data-rotate="90"
          data-color="green"
          data-translate-x="0"
          data-translate-y="0"
          data-product-animate-in="fade-in"
          data-product-animate-out="fade-out"
          class="c-frame-content"
        >
          <img
            data-product
            src="/images/Frames/Green.png"
            class="c-frame-content__image"
            alt="Green 993"
          >

        </div>
        <div
          slot="frame"
          data-rotate="0"
          data-color="yellow"
          data-translate-x="0"
          data-translate-y="0"
          data-product-animate-in="fade-in"
          data-product-animate-out="fade-out"
          class="c-frame-content"
        >
          <img
            data-product
            src="/images/Frames/Yellow.png"
            class="c-frame-content__image"
            alt="Yellow 993"
          >

        </div>
      </product-frames>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="filters">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
          </filter>
        </defs>
      </svg>
    `;
  }

}