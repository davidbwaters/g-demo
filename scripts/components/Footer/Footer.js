/*
 *  Scripts - Components - Footer
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class Footer extends LitElement {
  static get styles() {
    return css`
      :host {
        align-content: center;
        background-color: var(--heading-section-bg-color);
        display: grid;
        grid-template-columns: 80%;
        justify-content: center;
        padding-bottom: 6rem;
        padding-top: 8rem;
      }
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      backgroundColor: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
  }

  firstUpdated() {
    if (this.backgroundColor === 'gray') {
      this.shadowRoot.host.style.setProperty('--heading-section-bg-color', 'var(--color-subtle-light-5)');
    } else {
      this.shadowRoot.host.style.setProperty('--heading-section-bg-color', 'white');
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

  async _getData() {
    const response = await fetch(this.url + '/footer').then(res => res.json()).catch(err => console.error(err));
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

      <div
        class="c-footer__content"
      >

    `;
  }

}