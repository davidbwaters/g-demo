/*
 *  Scripts - Router - Outlet
 */
import { LitElement, html, css } from '../../modules/lit-element.js';
import { outlet } from '../../modules/lit-element-router.js';
export class RouterOutlet extends outlet(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

}