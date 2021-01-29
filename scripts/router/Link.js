/*
 *  Scripts - Router - Router Link
 */
import { LitElement, html, css } from '../../modules/lit-element.js';
import { navigator } from '../../modules/lit-element-router.js';
export class RouterLink extends navigator(LitElement) {
  static get properties() {
    return {
      href: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.href = '';
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._linkText = this.innerHTML;
  }

  render() {
    return html`
      <a href='${this.href}' @click='${this.handleClick}'>
        ${this._linkText}
      </a>
    `;
  }

  handleClick(e) {
    e.preventDefault();
    this.navigate(this.href);
  }

}