/*
 *  Scripts - Pages - Models
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
import { motionBlur } from '../../utils/motionBlur.js';
export class VehiclesPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        padding-top: var(--navbar-height);
        width: 100%;
      }
    `;
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

    this._addStylesheet();

    this._handleLoad = this._handleLoad.bind(this);

    this._loadedCheck();

    this.updateComplete.then(() => {
      this._handleLoad();
    });
  }

  _addStylesheet() {
    const app = document.querySelector('c-router-app');
    this.shadowRoot.adoptedStyleSheets = [app.sheet, app.sheetMedia, this.shadowRoot.adoptedStyleSheets[0]];
  }

  _loadedCheck() {
    this.shadowRoot.querySelector('.c-hero-frame__image').addEventListener('load', () => {
      this.loaded = true;
    });
  }

  _handleLoad() {
    if (this.loaded === true) {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });

      this._transitionIn();

      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
    } else {
      setTimeout(() => {
        this._handleLoad();
      }, 50);
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
    this.data = data.body;
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
          >
          </c-heading>
          <c-text-block
            content=${this.data.LowerSectionText}
            isFlush=true
          >
          </c-text-block>
        </div>
      </section>
      <section
        class="c-spec-table"
      >
        <div
          class="c-spec-table__image"
        >
        </div>
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