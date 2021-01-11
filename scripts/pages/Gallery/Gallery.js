/*
 *  Scripts - Pages - Gallery
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
import { motionBlur } from '../../utils/motionBlur.js';
import ScrollBooster from '../../../modules/scrollbooster.js';
export class GalleryPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 90vh;
        overflow-x: hidden;
        padding-top: var(--navbar-height);
        width: 100%;
      }

      .c-gallery__instructions {
        color: var(--color-subtle-dark-4);
        display: block;
        font-size: var(--text-size-title-stylized);
        font-weight: var(--font-weight-title-stylized);
        letter-spacing: var(--letter-spacing-title-stylized);
        line-height: var(--line-height-title-stylized);
        margin-bottom: .25rem;
        text-align: center;
        text-transform: uppercase;
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
    this.blurFilter = document.querySelector('c-router-app').shadowRoot.querySelector('c-router-outlet').querySelector('c-gallery-page').shadowRoot.querySelector('#blur').querySelector('feGaussianBlur');

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
    this.loaded = true;
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
    const response = await fetch(this.url + '/galleries').then(res => res.json()).catch(err => console.error(err));
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
    super.performUpdate();
  }

  render() {
    return html`

      <section
        class="c-gallery-item"
      >
        <c-gallery
          data=${JSON.stringify(this.data)}
        >
        </c-gallery>
        <div
          class="c-gallery__instructions"
        >
          Scroll to Navigate or Click and Drag
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