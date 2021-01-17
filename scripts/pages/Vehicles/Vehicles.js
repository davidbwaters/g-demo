/*
 *  Scripts - Pages - Vehicles
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { motionBlur } from '../../utils/motionBlur.js';
import { initialize } from '../../styles/initialize.js';
import { heroFrame } from '../../styles/components.hero-frames.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class VehiclesPage extends Page {
  static get styles() {
    return [initialize, objects, heroFrame, utilities, css`
        :host {
          display: block;
          height: 100%;
          width: 100%;
        }

        .c-vehicles-lower {
          background-color: var(--color-subtle-light-5);
          display: grid;
          padding-bottom: 6rem;
          padding-top: 6rem;
          row-gap: 2rem;
          text-align: center;
        }

        .c-vehicles-lower__text {
          margin-left: auto;
          margin-right: auto;
          max-width: 60rem;
          width: 80%;
        }

        .c-spec-table {
          background-color: var(--color-subtle-light-5);
          display: grid;
          grid-gap: 2rem;
          grid-template-columns: 80%;
          padding-bottom: 4rem;
          padding-top: 4rem;
        }

        @media(min-width: 40em) {

          .c-spec-table {
            grid-gap: 2rem;
            grid-template-columns: 1fr 1fr;
            padding-bottom: 6rem;
            padding-top: 6rem;
          }

        }

        .c-spec-table__content {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .c-spec-table__field-name {
          color: var(--color-subtle-dark-1);
          font-size: var(--text-size-title-tiny);
          font-weight: var(--font-weight-title-tiny);
          letter-spacing: var(--letter-spacing-title-tiny);
          line-height: 1rem;
          text-transform: uppercase;
        }

        .c-spec-table__field-content {
          color: var(--color-subtle-dark-3);
          font-size: .8rem;
          font-weight: var(--font-weight-title-stylized);
          letter-spacing: var(--letter-spacing-title-stylized);
          line-height: 1rem;
        }

        .c-speclist {
          padding-bottom: 4rem;
          padding-top: 4rem;
        }

        @media(min-width: 40em) {

          .c-speclist {
            padding-bottom: 6rem;
            padding-top: 6rem;
          }

        }

        .c-speclist__heading {
          margin-bottom: 4rem;
        }

        @media(min-width: 40em) {

          .c-speclist__heading {
            margin-bottom: 6rem;
          }

        }

        .c-speclist__content {
          margin-left: auto;
          margin-right: auto;
          width: 90%;
        }

        @media(min-width: 40em) {

          .c-speclist__content {
            width: 80%;
          }

        }

        .c-speclist__item {
          margin-bottom: 2rem;
        }

        .c-speclist__item-title {
          display: block;
          color: var(--color-subtle-dark-1);
          font-size: var(--text-size-title-normal);
          font-weight: var(--font-weight-title-normal);
          letter-spacing: var(--letter-spacing-title-normal);
          line-height: var(--line-height-title-normal);
          margin-bottom: .6rem;
          text-transform: uppercase;
        }

        .c-speclist__item-text {
          display: block;
          color: var(--color-subtle-dark-3);
          font-size: var(--text-size-title-normal-light);
          font-weight: var(--font-weight-title-normal-light);
          letter-spacing: var(--letter-spacing-title-normal-light);
          line-height: var(--line-height-title-normal-light);
          margin-bottom: .4rem;
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
    this.dataEndpoint = '/vehicle';
    this.debug = true;
  }

  firstUpdated() {
    this.blurFilter = document.querySelector('c-router-app').shadowRoot.querySelector('c-router-outlet').querySelector('c-vehicles-page').shadowRoot.querySelector('#blur').querySelector('feGaussianBlur');
  }

  handlePreload() {
    this.url = 'https://admin.guntherwerks.info';
    let images = [this.data.HeroImage.url];
    this.imagePreloader(images);
    super.handlePreload();
  }

  transitionIn() {
    this.blurFilter.setAttribute('stdDeviation', '10,0');
    setTimeout(() => {
      this.blurAnimationframes();
    }, 500);
  }

  blurAnimationframes() {
    motionBlur(this.blurFilter);
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
          o-media-block--spaced-mobile
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
        o-media-block
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
          <div class="u-text-title">
            ${this.data.HeroSubHeading}
          </div>
        </div>
      </div>

      <c-angle-section
        data=${JSON.stringify(this.data.HeroAngleBG)}
      >
      </c-angle-section>
    </div>

    </section>

      ${this.data.ScaleSections.map(data => html`

          <c-scale-section
            data=${JSON.stringify(data)}
          >
          </c-scale-section>

      `)}
      <section
        class="c-vehicles-lower"
      >
        <div
          class="c-vehicles-lower__text"
        >
          <c-heading
            text=${this.data.LowerSectionHeading}
            size="huge"
          >
          </c-heading>
          <c-text-block
            content=${this.data.LowerSectionText}
            isFlush=true
            size="medium"
            backgroundColor="transparent"
          >
          </c-text-block>
        </div>
        <img
          class="c-vehicles-lower__image"
          srcset=${this.url + this.data.LowerSectionImage.formats.large.url + ', ' + this.url + this.data.LowerSectionImage.url + ' 2x'}
          src=${this.url + this.data.LowerSectionImage.url}
          alt=${this.data.LowerSectionImage.alternativeText}
        >
      </section>

      <section
        class="c-spec-table"
      >
        <div
          class="c-spec-table__image"
        >
          <img
            src=${this.url + this.data.TableSectionImage.url}
            alt=${this.data.TableSectionImage.alternativeText}
          >
        </div>
        <div
          class="c-spec-table__content"
        >
          ${this.data.Table.map(data => html`

            <span class="c-spec-table__field-name">
              ${data.Field[0].Text}
            </span>
            <span class="c-spec-table__field-content">
              ${data.Field[1].Text}
            </span>

          `)}
        </div>
      </section>

      <section
        class="c-speclist"
      >
        <c-heading
          text=${this.data.SpecSectionTitle}
          size="medium"
          class="c-speclist__heading"
        >
        </c-heading>
        <div
          class="c-speclist__content"
        >
          <masonry-layout>
            ${this.data.SpecsList.map(data => html`

              <div
                class="c-speclist__item"
              >
                <span class="c-speclist__item-title">
                  ${data.Title}
                </span>

                ${data.Item.map(item => html`

                  <span class="c-speclist__item-text">
                    ${item.Text}
                  </span>

                `)}

              </div>

            `)}
          </masonry-layout>
        </div>
      </section>
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