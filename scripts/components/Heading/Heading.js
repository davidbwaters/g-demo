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

      *::selection {
        background-color: var(--color-fg);
        color: var(--color-bg);
        -webkit-text-stroke-color: var(--color-bg);
      }

      .c-heading__text {
        color: var(--heading-color);
        display: block;
        font-size: calc(var(--heading-size) * .75);
        font-weight: var(--heading-weight);
        letter-spacing: -.015em;
        line-height: var(--heading-line-height);
        margin-bottom: .5em;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        max-width: 60rem;
        text-align: var(--heading-text-align);
      }

      @media (min-width:40em) {

        .c-heading__text {
          font-size: calc(var(--heading-size) * .85);
        }

      }

      @media (min-width:60em) {

        .c-heading__text {
          font-size: var(--heading-size);
        }

      }

      span {
        color: var(--heading-span-color);
      }
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      text: {
        type: String
      },
      color: {
        type: String
      },
      element: {
        type: String
      },
      isBold: {
        type: Boolean
      },
      lighterColor: {
        type: Boolean
      },
      size: {
        type: String
      },
      spanColor: {
        type: String
      },
      textAlign: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.textAlign = 'center';
    this.size = 'Huge';
    this.isBold = true;
    this.lighterColor = false;
    this.element = 'h3';
    this.weight = 'bold';
  }

  firstUpdated() {
    if (this.data) {
      this.text = this.data.Text;
      this.size = this.data.Size;

      if (this.data.BoldFont === 'true' || this.data.BoldFont === true) {
        this.weight = 'bold';
      } else {
        this.weight = 'light';
      }

      if (this.data.TextAlign) {
        this.textAlign = this.data.TextAlign;
      }

      if (this.data.Color) {
        this.color = this.data.Color.toLowerCase();
      }
    }

    if (this.text === 'undefined') {
      this.text = this.innerHTML;
    }

    if (this.weight.toLowerCase() === 'normal') {
      this.weight = 'light';
    }

    const headingEl = document.createElement(this.element);
    headingEl.classList.add('c-heading__text');
    headingEl.innerHTML = this.text;
    this.shadowRoot.appendChild(headingEl);
    this.shadowRoot.host.style.setProperty('--heading-size', 'var(--text-size-heading-' + this.size.toLowerCase() + ')');
    this.shadowRoot.host.style.setProperty('--heading-text-align', this.textAlign.toLowerCase());
    this.shadowRoot.host.style.setProperty('--heading-line-height', 'var(--line-height-heading-' + this.size.toLowerCase() + ')');
    this.shadowRoot.host.style.setProperty('--heading-weight', 'var(--font-' + this.weight.toLowerCase() + 'er-weight)');

    if (this.color === 'lighter') {
      this.shadowRoot.host.style.setProperty('--heading-color', 'var(--color-fg-lighter)');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'var(--color-fg)');
    } else if (this.color === 'white') {
      this.shadowRoot.host.style.setProperty('--heading-color', 'var(--color-subtle-light-5)');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'var(--color-subtle-light-6)');
    } else {
      this.shadowRoot.host.style.setProperty('--heading-color', 'var(--color-fg)');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'var(--color-fg-lighter)');
    }
  }

}