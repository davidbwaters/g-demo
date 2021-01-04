/*
 *  Scripts - Components - Heading
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class HeadingSection extends LitElement {
  static get styles() {
    return css`
      :host {
        align-content: center;
        background-color: var(--heading-section-bg-color);
        display: grid;
        grid-template-columns: 66%;
        justify-content: center;
        padding-bottom: 6rem;
        padding-top: 8rem;
      }
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      backgroundColor: {
        type: String
      }
    };
  }

  firstUpdated() {
    if (this.backgroundColor === 'gray') {
      this.shadowRoot.host.style.setProperty('--heading-section-bg-color', 'var(--color-subtle-light-5)');
    } else {
      this.shadowRoot.host.style.setProperty('--heading-section-bg-color', 'white');
    }
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