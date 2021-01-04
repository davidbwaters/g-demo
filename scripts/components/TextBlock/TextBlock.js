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
        grid-template-columns: 80%;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 4rem;
        padding-top: 4rem;
      }

      span {
        color: var(--text-block-span-color);
      }

      p {
        max-width: 1080px;
        margin-left: auto;
        margin-right: auto;
      }

    `;
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribue: true
      },
      content: {
        type: String,
        attribute: true
      },
      size: {
        type: String,
        attribute: true
      },
      lighterColor: {
        type: Boolean,
        attribute: true
      },
      isBold: {
        type: Boolean,
        attribute: true
      },
      backgroundColor: {
        type: String,
        attribute: true
      }
    };
  }

  constructor() {
    super();
    this.size = 'Normal';
    this.isBold = true;
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
      this.shadowRoot.host.style.setProperty('--text-block-bg-color', 'var(--color-fg-lighter)');
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
        contentEl.appendChild(paragraphEl);
      });
    } else {
      contentEl.innerHTML = JSON.parse(this.content);
    }
  }

  render() {
    return html`

    `;
  }

}