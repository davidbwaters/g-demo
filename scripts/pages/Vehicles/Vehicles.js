/*
 *  Scripts - Pages - Models
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
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
    this._addStylesheet();

    this._handleLoad = this._handleLoad.bind(this);

    this._loadedCheck();

    this.updateComplete.then(() => {
      this._handleLoad();
    });
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

  _addStylesheet() {
    const app = document.querySelector('c-router-app');
    this.shadowRoot.adoptedStyleSheets = [app.sheet, app.sheetMedia, this.shadowRoot.adoptedStyleSheets[0]];
  }

  _transitionIn() {}

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
    console.log(this.data);
    console.log(this.data.ScaleSections);
    super.performUpdate();
  }

  render() {
    return html` <div>

      <section class="c-hero-frame">
        <div class="c-hero-frame__content">
          <div class="c-hero-frame__branding">
            <img
              class="u-margin-bottom-5"
              src="${this.url + this.data.HeroLogo.url}"
              alt="${this.url + this.data.HeroLogo.caption}"
            />
            <c-slant-title
              data=${JSON.stringify(this.data.HeroSlantTitle)}
            >
            </c-slant-title>
          </div>
          <img
            src="${this.url + this.data.HeroImage.url}"
            alt="${this.url + this.data.HeroImage.caption}"
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

    </div>`;
  }

}