/*
 *  Scripts - Components - Slant Title
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { getColor, getForegroundColor } from '../../utils/theme.js';
export class SlantTitle extends LitElement {
  static get styles() {
    return css`
      :host {
        color: var(--slant-title-text-color);
        display: inline-block;
        font-size: 1rem;
        letter-spacing: .25em;
        padding-bottom: .25rem;
        padding-left: 1rem;
        padding-top: .25rem;
        padding-right: 1.25rem;
        position: relative;
        text-align: right;
        text-transform: uppercase;
      }

      :host::before {
        background-color: var(--slant-title-bg-color);
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        right: .5rem;
        top: 0;
        transform: skewX(-30deg);
        width: 200vw;
        z-index: -1;
      }
    `;
  }

  static get properties() {
    return {
      color: {
        type: String,
        attribute: true
      },
      text: {
        type: String,
        attribute: true
      },
      data: {
        type: Object,
        attribute: true
      }
    };
  }

  constructor() {
    super();
    this.color = 'Gray';
    this.text = this.innerText;
  }

  firstUpdated() {
    if (this.data) {
      this.color = this.data.Color;
      this.text = this.data.Text;
    }

    this._textColor = getForegroundColor(this.color);
    this._bgColor = getColor(this.color);
    this.shadowRoot.host.style.setProperty('--slant-title-text-color', this._textColor);
    this.shadowRoot.host.style.setProperty('--slant-title-bg-color', this._bgColor);
    this.innerText = this.text;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

}