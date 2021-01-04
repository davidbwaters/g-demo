/*
 *  Scripts - Components - Heading
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class HeadingSection extends LitElement {
  static get styles() {
    return css`
      :host {
        align-content: center;
        background-color: white;
        display: grid;
        grid-template-columns: 80%;
        justify-content: center;
        padding-bottom: 6rem;
        padding-top: 6rem;
      }
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribue: true
      }
    };
  }

  render() {
    return html`
      <c-heading
        data=${JSON.stringify(this.data.Heading)}
      >
      </c-heading>
    `;
  }

}