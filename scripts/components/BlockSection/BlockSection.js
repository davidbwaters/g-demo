/*
 *  Scripts - Components - Block Section
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class BlockSection extends LitElement {
  static get styles() {
    return [initialize, objects, utilities, css`
        :host {
          background-color: var(--block-section-bg-color);
          display: block;
          padding-bottom: 6rem;
          padding-top: 6rem;
        }

        @media (min-width:40rem) {

          :host {
            grid-template-columns: 80%;
            padding-bottom: 6rem;
            padding-top: 6rem;
          }

        }

        img {

        }
      `];
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
              o-media-block
              o-media-block--split-flush-end
            "
          >
            <div
              class="
                o-media-block__item
              "
            >
              <c-heading
                text="
                  ${this.data.Heading}
                "
              >
              </c-heading>
              <c-text-block
                content=${JSON.stringify(this.data.Paragraphs)}
                isFlush=true
                backgroundColor="transparent"
              >
              </c-text-block>
            </div>
            <div
              class="
                o-media-block__item
                c-block-section__image
              "
            >
              <img
                src=${this.url + this.data.Image.url}
              >
            </div>
          </div>
        ` : this.data.Layout === 'TextCenter' ? html`
          <div
            class="
              o-media-block
              o-media-block--split
            "
          >
            <div
              class="
                o-media-block__item
              "
            >
              <c-heading
                text="
                  ${this.data.Heading}
                "
              >
              </c-heading>
              <c-text-block
                content=${JSON.stringify(this.data.Paragraphs)}
                isFlush=true
              >
              </c-text-block>
            </div>
            <div
              class="
                o-media-block__item
                c-block-section__image
              "
            >
              <img
                src=${this.url + this.data.Image.url}
              >
            </div>
          </div>
        ` : html`
          <div
            class="
              o-media-block
              o-media-block--split-flush-start
            "
          >
            <div
              class="
                o-media-block__item
              "
            >
              <c-heading
                text="
                  ${this.data.Heading}
                "
              >
              </c-heading>
              <c-text-block
                content=${JSON.stringify(this.data.Paragraphs)}
                isFlush=true
              >
              </c-text-block>
            </div>
            <div
              class="
                o-media-block__item
                c-block-section__image
              "
            >
              <img
                src=${this.url + this.data.Image.url}
              >
            </div>
          </div>
          `}

    `;
  }

}