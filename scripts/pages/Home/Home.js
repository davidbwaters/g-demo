/*
 *  Scripts - Pages - Home
 */
import { Page } from '../../bases/Page.js';
import { css, html } from '../../../modules/lit-element.js';
import { initialize } from '../../styles/initialize.js';
import { heroFrame } from '../../styles/components.hero-frames.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class HomePage extends Page {
  static get styles() {
    return [initialize, objects, heroFrame, utilities, css`
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
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      loaded: {
        type: Boolean,
        attribute: false
      }
    };
  }

  constructor() {
    super();
    console.log(this.url);
    this.dataEndpoint = '/home';
    this.debug = true;
  }

  firstUpdated() {}

  async handlePreload() {
    console.log('running');
    await this.imagePreloader([this.data.HeroImage.url]);
    super.handlePreload();
  }

  transitionIn() {
    super.transitionIn();
    super.blurAnimation();
  }

  render() {
    return html`
      <section class="c-hero-frame">

        <div class="
            o-section-block
            o-section-block--top
          "
        >
          <div class="
            o-media-block
            o-media-block--top
            o-media-block--narrow
            o-media-block--split-flush-end
          ">
            <div class="
              o-media-block__item
            ">
              <img
                class="c-hero-frame__branding"
                src="${this.url + this.data.HeroLogo.url}"
                alt="${this.url + this.data.HeroLogo.alternativeText}"
              />
              <c-slant-title
                data=${JSON.stringify(this.data.HeroSlantTitle)}
              >
              </c-slant-title>
              <div class="u-text-title-tiny">
                ${this.data.HeroSubHeading}
              </div>
            </div>
            <div class="
              o-media-block__item
            ">
              <img
                src="${this.url + this.data.HeroImage.url}"
                alt="${this.url + this.data.HeroImage.alternativeText}"
                class="c-hero-frame__image"
              />
            </div>
          </div>

          <div class="
            o-block
            o-block--narrow
            u-text-align-center
          ">
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

            </div>
          </div>

          <c-angle-section
            data=${JSON.stringify(this.data.HeroAngleBG)}
          >
          </c-angle-section>
        </div>

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

    `;
  }

}