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
        font-size: calc(var(--text-block-size) * .85);
        font-weight: var(--text-block-weight);
        grid-template-columns: var(--text-block-width);
        justify-content: center;
        line-height: var(--text-block-line-height);
        padding-bottom: var(--text-block-padding-y);
        padding-top: var(--text-block-padding-y);
      }

      @media (min-width:40em) {

        :host {
          font-size: calc(var(--text-block-size) * 1);
        }

      }

      @media (min-width:60em) {

        :host {
          font-size: var(--text-block-size);
        }

      }

      *::selection {
        background-color: var(--color-fg);
        color: var(--color-bg);
        -webkit-text-stroke-color: var(--color-bg);
      }

      p {
        max-width: 60rem;
        margin-bottom: 1em;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
      }

      span {
        color: var(--text-block-span-color);
      }

    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      debug: {
        type: Boolean
      },
      content: {
        type: String
      },
      backgroundColor: {
        type: String
      },
      color: {
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
      size: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.size = 'Normal';
    this.isBold = false;
    this.isFlush = false;
    this.TextBlockData = this.data;
  }

  firstUpdated() {
    const contentEl = this.shadowRoot;

    if (this.TextBlockData) {
      this.size = this.TextBlockData.Size;
      this.isBold = this.TextBlockData.BoldFont;
      this.lighterColor = this.TextBlockData.LighterColor;
      this.content = this.TextBlockData.Content;
    }

    this.shadowRoot.host.style.setProperty('--text-block-size', 'var(--text-size-' + this.size.toLowerCase() + ')');

    if (this.isBold) {
      this.shadowRoot.host.style.setProperty('--text-block-weight', 'var(--font-bolder-weight)');
      this.shadowRoot.host.style.setProperty('--text-block-line-height', 'var(--line-height-text-' + this.size.toLowerCase() + ')');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-weight', 'var(--font-lighter-weight)');
      this.shadowRoot.host.style.setProperty('--text-block-line-height', 'var(--line-height-text-spaced-' + this.size.toLowerCase() + ')');
    }

    if (this.lighterColor) {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'var(--color-fg-lighter)');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'var(--color-fg)');
    } else if (this.color === 'white') {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'var(--color-subtle-light-5)');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'var(--color-subtle-light-6)');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'var(--color-subtle-dark-3)');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'var(--color-fg)');
    }

    if (this.backgroundColor === 'gray') {
      this.shadowRoot.host.style.setProperty('--text-block-bg-color', 'var(--color-subtle-light-5)');
    } else if (this.backgroundColor === 'transparent') {
      this.shadowRoot.host.style.setProperty('--text-block-bg-color', 'transparent');
    } else if (this.backgroundColor === 'white') {
      this.shadowRoot.host.style.setProperty('--text-block-bg-color', 'white');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-bg-color', 'white');
    }

    if (this.isFlush) {
      this.shadowRoot.host.style.setProperty('--text-block-padding-y', '0rem');
      this.shadowRoot.host.style.setProperty('--text-block-width', '100%');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-padding-y', '5rem');
      this.shadowRoot.host.style.setProperty('--text-block-width', '80%');
    }

    this.debug = true;

    if (typeof this.content === 'string' && this.content.trim().slice(0, 1) === '[') {
      this.content = JSON.parse(this.content);
    }

    if (typeof this.content === 'object') {
      if (this.debug) {
        console.log('Text block array');
        console.log(this.content);
      }

      this.content.forEach(content => {
        const paragraphEl = document.createElement('p');

        if (content.Paragraph) {
          paragraphEl.innerHTML = content.Paragraph;
        }

        if (content.Text) {
          paragraphEl.innerHTML = content.Text;
        }

        contentEl.appendChild(paragraphEl);
      });
    } else {
      this.debug = true;

      if (this.debug) {
        console.log('Text block not array');
        console.log(this.content);
        console.log(this.content.slice(0, 2));
      }

      const paragraphEl = document.createElement('p');
      paragraphEl.innerHTML = this.content;
      contentEl.appendChild(paragraphEl);
    }
  }

  render() {
    return html`

    `;
  }

}