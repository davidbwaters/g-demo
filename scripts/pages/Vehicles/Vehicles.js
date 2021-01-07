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
    this.url = 'https://admin.guntherwerks.info';

    this._addStylesheet();

    this._handleLoad = this._handleLoad.bind(this);

    this._loadedCheck();

    this.updateComplete.then(() => {
      this._handleLoad();
    });
  }

  _loadedCheck() {
    this.loaded = true;
  }

  _handleLoad() {
    if (this.loaded === true) {
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
        sheet.insertRule(rule.cssText);
      }
    });
    this.shadowRoot.adoptedStyleSheets = [this.shadowRoot.adoptedStyleSheets[0], sheet];
  }

  _transitionIn() {}

  async _getData() {
    const response = await fetch(this.url + '/contact').then(res => res.json()).catch(err => console.error(err));
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
      <h1>This is Contact Page</h1>
    </div>`;
  }

}