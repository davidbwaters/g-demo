/*
 *  Scripts - Pages - Contact
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
export class ContactPage extends LitElement {
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
    return html` <div>
      <h1>This is Contact Page</h1>
    </div>`;
  }

  static get properties() {
    return {
      eg: {
        type: String
      }
    };
  }

}