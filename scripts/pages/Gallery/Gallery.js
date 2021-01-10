/*
 *  Scripts - Pages - Gallery
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
export class GalleryPage extends LitElement {
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
    this.addStylesheet();
    this.handleLoad = this.handleLoad.bind(this);
    this.loadedCheck();
    this.updateComplete.then(() => {
      this.handleLoad();
    });
  }

  loadedCheck() {
    this.loaded = true;
  }

  handleLoad() {
    if (this.loaded === true) {
      this.transitionIn();
      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
    } else {
      setTimeout(() => {
        this.handleLoad();
      }, 50);
    }
  }

  addStylesheet() {
    const app = document.querySelector('c-router-app');
    this.shadowRoot.adoptedStyleSheets = [app.sheet, app.sheetMedia, this.shadowRoot.adoptedStyleSheets[0]];
  }

  transitionIn() {}

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
    return html` <div>
      <h1>Gallery</h1>
    </div>`;
  }

}