/*
 *  Scripts - Router - Outlet
 */
import { LitElement, html, css } from '../../modules/lit-element.js';
import { outlet } from '../../modules/lit-element-router.js';
export class RouterOutlet extends outlet(LitElement) {
  static get styles() {
    return css`
      :host {
        background-color: white;
        display: block;
        margin-bottom: 0;
        position: relative;
        width: 100%;
        z-index: 2;
      }
    `;
  }

  render() {
    return html`

      <slot></slot>
    `;
  }

}