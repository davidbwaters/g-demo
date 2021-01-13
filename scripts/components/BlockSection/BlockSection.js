/*
 *  Scripts - Components - Block Section
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class BlockSection extends LitElement {
  static get styles() {
    return css`
      :host {
        background-color: var(--block-section-bg-color);
        display: grid;
        grid-template-columns: 80%;
        justify-content: var(--block-section-align);
        padding-bottom: 6rem;
        padding-top: 6rem;
        text-align: var(--block-section-align);
      }

      @media (min-width:40rem) {

        :host {
          grid-template-columns: 80%;
          padding-bottom: 6rem;
          padding-top: 6rem;
        }

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

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
  }

  firstUpdated() {
    if (this.backgroundColor === 'gray' || this.data.GrayBackground) {
      this.shadowRoot.host.style.setProperty('--block-section-bg-color', 'var(--color-subtle-light-5)');
    } else {
      this.shadowRoot.host.style.setProperty('--block-section-bg-color', 'white');
    }

    if (this.layout === 'center' || this.data.Layout === 'Centered') {
      this.shadowRoot.host.style.setProperty('--block-section-align', 'center');
      this.shadowRoot.host.style.setProperty('--block-section-columns', '1fr');
    } else {
      this.shadowRoot.host.style.setProperty('--block-section-columns', '1fr 1fr');
    }
  }

  render() {
    return html`
      ${this.data.Layout === 'TextLeft' ? html`
          <div
            class="
              c-block-section__text
            "
          >
            <c-heading
              text="
                ${this.data.Heading}
              "
            >
            </c-heading>
            <c-text-block
              content="${this.data.Paragraphs}"
              flush=true
            >
            </c-text-block>
          </div>
          <div
            class="
              c-block-section__image
            "
          >
            <img
              src=${this.url + this.data.Image.url}
            >
          </div>
        ` : html`
          <div
            class="
              c-block-section__image
            "
          >
            <img
              src=${this.url + this.data.Image.url}
            >
          </div>
          <div
            class="
              c-block-section__text
            "
          >
            <c-heading
              text="
                ${this.data.Heading}
              "
            >
            </c-heading>
            <c-text-block
              content="${this.data.Paragraphs}"
              flush=true
            >
            </c-text-block>
          </div>
        `}

    `;
  }

}