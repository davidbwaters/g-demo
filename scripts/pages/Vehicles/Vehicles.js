/*
 *  Scripts - Pages - Models
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
import { motionBlur } from '../../utils/motionBlur.js';
import { imagesPreload, imagesPreloadedCheck, imagesPreloadedCheckWait } from '../../utils/imagesPreload.js';
import { generic } from '../../styles/generic.js';
import { heroFrame } from '../../styles/heroFrame.js';
export class VehiclesPage extends LitElement {
  static get styles() {
    return [generic, heroFrame, css`
        :host {
          display: block;
          height: 100%;
          padding-top: var(--navbar-height);
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
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
  }

  firstUpdated() {
    this.blurFilter = document.querySelector('c-router-app').shadowRoot.querySelector('c-router-outlet').querySelector('c-vehicles-page').shadowRoot.querySelector('#blur').querySelector('feGaussianBlur');
    this.handleLoad = this.handleLoad.bind(this);
    this.updateComplete.then(() => {
      this.handleLoad();
    });
  }

  preload() {
    if (!this.data) {
      setTimeout(() => {
        this.preload();
      }, 500);
    } else {
      this.url = 'https://admin.guntherwerks.info';
      let images = [this.url + this.data.HeroLogo.url, this.url + this.data.HeroImage.url];
      let preloading = imagesPreload(images);
      imagesPreloadedCheckWait(preloading, true);
      this.loaded = true;
    }
  }

  handleLoad() {
    if (this.loaded === true) {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });

      this._transitionIn();

      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
    } else {
      setTimeout(() => {
        this.handleLoad();
      }, 500);
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
    const response = await fetch(this.url + '/vehicle').then(res => res.json()).catch(err => console.error(err));
    return {
      statusCode: 200,
      body: response
    };
  }

  async performUpdate() {
    const data = await this._getData(data => {
      this.data = data;
    });
    console.log(this.data);
    this.data = data.body;
    this.LowerSectionImage = this.data.LowerSectionImage;
    super.performUpdate();
  }

  render() {
    return html`

      <section
        class="c-hero-frame"
      >
        <div class="c-hero-frame__content">
          <div class="c-hero-frame__branding">
            <img
              class="u-margin-bottom-5"
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
          srcset=${this.url + this.LowerSectionImage.formats.large.url + ', ' + this.url + this.LowerSectionImage.url + ' 2x'}
          src=${this.url + this.LowerSectionImage.url}
          alt=${this.LowerSectionImage.alternativeText}
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