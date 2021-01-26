/*
 *  Scripts - Components - Motion Blur
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class TextBlock extends LitElement {
  static get styles() {
    return css`
      :host {
        color: var(--text-block-color);
        display: block;
        font-size: calc(var(--text-block-size) * .8);
        font-weight: var(--text-block-weight);
        line-height: var(--text-block-line-height);
      }

      @media (min-width:40em) {

        :host {
          font-size: calc(var(--text-block-size) * .85);
        }

      }

      @media (min-width:60em) {

        :host {
          font-size:calc(var(--text-block-size) * .95);
        }

      }

      @media (min-width:80em) {

        :host {
          font-size:calc(var(--text-block-size) * 1);
        }

      }

      *::selection {
        background-color: var(--color-fg);
        color: var(--color-bg);
        -webkit-text-stroke-color: var(--color-bg);
      }

      p {
        margin-bottom: 1em;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        width: 100%;
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
      Text: {
        type: Array
      },
      Color: {
        type: String
      },
      ColorAlternate: {
        type: Boolean
      },
      TextBold: {
        type: Boolean
      },
      Size: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.Size = 'Normal';
    this.TextBold = false;
    this.Text = []; //this.debug = true
  }

  firstUpdated() {
    if (this.data) {
      if (this.data.Text) {
        this.Text = this.data.Text;
      }

      if (this.data.TextBold) {
        this.TextBold = this.data.TextBold;
      }

      if (this.data.TextSize) {
        this.Size = this.data.TextSize;
      }
    }

    this.shadowRoot.host.style.setProperty('--text-block-size', 'var(--text-size-' + this.Size.toLowerCase() + ')');

    if (this.data.TextBoldFont) {
      this.shadowRoot.host.style.setProperty('--text-block-weight', 'var(--font-bolder-weight)');
      this.shadowRoot.host.style.setProperty('--text-block-line-height', 'var(--line-height-text-' + this.Size.toLowerCase() + ')');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-weight', 'var(--font-lighter-weight)');
      this.shadowRoot.host.style.setProperty('--text-block-line-height', 'var(--line-height-text-spaced-' + this.Size.toLowerCase() + ')');
    }

    if (this.data.TextColorAlternate) {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'var(--color-fg-subtle)');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'var(--color-fg)');
    } else if (this.Color === 'inverse') {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'var(--color-fg-inverse)');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'var(--color-fg-inverse-contrast)');
    } else if (this.Color === 'inherit') {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'inherit');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'inherit');
    } else {
      this.shadowRoot.host.style.setProperty('--text-block-color', 'var(--color-fg)');
      this.shadowRoot.host.style.setProperty('--text-block-span-color', 'var(--color-fg-subtle)');
    }
  }

  updated() {
    const els = this.shadowRoot.querySelectorAll('p');
    els.forEach(el => {
      el.innerHTML = el.innerHTML.replaceAll('&lt;span&gt;', '<span>').replaceAll('&lt;/span&gt;', '</span>');
      el.innerHTML = el.innerHTML.replaceAll('&lt;strong&gt;', '<strong>').replaceAll('&lt;/strong&gt;', '</strong>');
    });
  }

  render() {
    return html`
      ${this.Text.map(i => html`
        <p>
          ${i.Text}
        </p>
      `)}
    `;
  }

}