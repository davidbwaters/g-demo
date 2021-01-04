/*
 *  Scripts - Components - Motion Blur
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class TextBlock extends LitElement {
  static get styles() {
    return css`
      :host {
        align-content: center;
        background-color: var(--text-block-bg-color);
        color: var(--text-block-color);
        display: grid;
        font-size: var(--text-block-size);
        font-weight: var(--text-block-weight);
        grid-template-columns: var(--text-block-width);
        justify-content: center;
        line-height: 1.2;
        padding-bottom: var(--text-block-padding-y);
        padding-top: var(--text-block-padding-y);
      }

      span {
        color: var(--text-block-span-color);
      }

      p {
        max-width: 1080px;
        margin-bottom: 0;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
      }

    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      content: {
        type: String,
        attribute: true
      },
      size: {
        type: String
      },
      lighterColor: {
        type: Boolean
      },
      isBold: {
        type: Boolean
      },
      isFlush: {
        type: Boolean
      },
      backgroundColor: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.size = 'Normal';
    this.isBold = true;
    this.isFlush = false;
  }

  firstUpdated() {
    const contentEl = this.shadowRoot;

    if (this.data) {
      this.size = this.data.Size;
      this.isBold = this.data.BoldFont;
      this.lighterColor = this.data.LighterColor;
      this.content = this.data.Content;
    }

    this.shadowRoot.host.style.setProperty('--text-block-size', 'var(--text-size-text' + this.size.toLowerCase() + ')');

    if (this.isFlush) {
      this.shadowRoot.host.style.setProperty('--text-block-weight', '0rem');
      this.shadowRoot.host.style.setProperty('--text-block-width', '100%');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-weight', '5rem');
      this.shadowRoot.host.style.setProperty('--text-block-width', '80%');
    }

    if (this.isBold) {
      this.shadowRoot.host.style.setProperty('--text-block-weight', 'var(--font-bolder-weight)');
    }

    if (this.lighterColor) {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'var(--color-fg-lighter)');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'var(--color-fg)');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'var(--color-subtle-dark-3)');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'var(--color-fg-lighter)');
    }

    if (this.backgroundColor === 'gray') {
      this.shadowRoot.host.style.setProperty('--text-block-bg-color', 'var(--color-subtle-5)');
    } else if (this.backgroundColor === 'transparent') {
      this.shadowRoot.host.style.setProperty('--text-block-bg-color', 'transparent');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-bg-color', 'white');
    }

    this.content = JSON.stringify(this.content);
    console.log(JSON.stringify(this.content));

    if (this.content.slice(0, 1) === '[') {
      this._content = JSON.parse(this.content);
      console.log('a' + this._content);

      this._content.forEach(content => {
        console.log(this);
        const paragraphEl = document.createElement('p');
        paragraphEl.innerHTML = content.Paragraph;
        console.log(paragraphEl);
      });
    } else {
      const paragraphEl = document.createElement('p');
      paragraphEl.innerHTML = JSON.parse(this.content);
      contentEl.appendChild(paragraphEl);
    }
  }

  render() {
    return html`

    `;
  }

}