/*
 *  Scripts - Components - Heading
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class Heading extends LitElement {
  static get styles() {
    return css`
      :host {
        color: var(--heading-color);
        display: block;
        font-size: var(--heading-size);
        font-weight: var(--heading-weight);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: var(--heading-color);
        display: block;
        font-size: var(--heading-size);
        font-weight: var(--heading-weight);
        line-height: var(--heading-line-height);
        margin-bottom: .33em;
        margin-top: 0;
      }

      span {
        color: var(--heading-color)-span;
      }
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribue: true
      },
      text: {
        type: String,
        attribute: true
      },
      size: {
        type: String,
        attribute: true
      },
      weight: {
        type: String,
        attribute: true
      },
      color: {
        type: String,
        attribute: true
      },
      spanColor: {
        type: String,
        attribute: true
      },
      element: {
        type: String,
        attribute: true
      }
    };
  }

  constructor() {
    super();
    this.text = this.innerHTML;
    this.size = 'Large';
    this.weight = 'Bold';
    this.element = 'h3';
  }

  firstUpdated() {
    if (this.data) {
      this.text = this.data.Text;
      this.size = this.data.Size;

      if (this.data.Weight) {
        this.weight = this.data.Weight;
      }
    }

    const headingEl = document.createElement(this.element);
    headingEl.innerHTML = this.text;
    this.shadowRoot.appendChild(headingEl);
    this.shadowRoot.host.style.setProperty('--heading-size', 'var(--text-size-heading-' + this.size.toLowerCase() + ')');
    this.shadowRoot.host.style.setProperty('--heading-line-height', 'var(--line-height-heading-' + this.size.toLowerCase() + ')');
    this.shadowRoot.host.style.setProperty('--heading-weight', 'var(--font-' + this.weight.toLowerCase() + 'er-weight)');

    if (this.color === 'lighter') {
      this.shadowRoot.host.style.setProperty('--heading-color', 'var(--color-fg-lighter)');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'var(--color-fg)');
    } else if (this.color === 'white') {
      this.shadowRoot.host.style.setProperty('--heading-color', 'white');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'white');
    } else {
      this.shadowRoot.host.style.setProperty('--heading-color', 'var(--color-fg)');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'var(--color-fg-lighter)');
    }
  }

}