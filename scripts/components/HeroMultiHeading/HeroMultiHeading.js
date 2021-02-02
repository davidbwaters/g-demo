/*
 *  Scripts - Components - Hero Multi Heading
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { remote } from '../../config/remote.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class HeroMultiHeading extends LitElement {
  static get styles() {
    return [initialize, objects, utilities, css`

        :host {
          background-color:
            var(--hero-multi-heading-background-color);
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: min-content 1fr;
          padding-top: calc(var(--navbar-height) + 4rem);
        }


        @media(min-width:40rem) {

          :host {

            min-height: 95vh;

            }

        }

        .c-hero-multi-heading__text {
          background-color:
            var(--hero-multi-heading-background-color);
          font-size: calc(var(--text-size-heading-large) * .8);
          letter-spacing: var(--heading-text-letter-spacing);
          line-height: 1.3;
          margin-bottom: 2rem;
          margin-top: 0;
          text-align: center;
        }

        .c-hero-multi-heading__text span {
          font-size: var(--text-size-heading-large);
          font-size: 1.4em;
          display: block;
        }

        .c-hero-multi-heading__image {
          background-position: center bottom;
          background-repeat: no-repeat;
          background-size: 180% auto;
          min-height: 45vh;
          margin-top: 1rem;
        }

        @media(min-width:40rem) {

          .c-hero-multi-heading__image {
            background-repeat: no-repeat;
            background-size: auto 100%;
            margin-top: 0rem;
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
  }

  async preload() {
    await super.imagePreloader([this.data.Image.url]);
  }

  firstUpdated() {
    this.preload();

    if (this.data.GrayBackground) {
      this.shadowRoot.host.style.setProperty('--hero-multi-heading-background-color', 'var(--color-bg-subtle)');
    } else {
      this.shadowRoot.host.style.setProperty('--hero-multi-heading-background-color', 'var(--color-bg)');
    }
  }

  render() {
    return html`
      <h1 class="
        c-hero-multi-heading__text
      ">
        ${this.data.HeadingText1}
        <span>${this.data.HeadingText2}</span>
      </h1>
      <div
        class="c-hero-multi-heading__image"
        style="
          background-image:
            url(${this.url + this.data.Image.url})
        "
      >
      </div>
    `;
  }

}