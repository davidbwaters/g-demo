/*
 *  Scripts - Components - Slant Title
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class SlantTitle extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        font-size: 1rem;
        letter-spacing: .25em;
        padding-bottom: .25rem;
        padding-left: 1rem;
        padding-top: .25rem;
        padding-right: 2.5rem;
        position: relative;
        text-align: right;
        text-transform: uppercase;
      }
      :host::before {
        background-color: var(--slant-title-color);
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        right: 1.5rem;
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
        type: String
      }
    };
  }

  constructor() {
    super();
    this.color = 'gray';
  }

  firstUpdated() {
    this.shadowRoot.host.style.setProperty('--slant-title-color', 'var(--color-gw-' + this.color + ')');
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

}