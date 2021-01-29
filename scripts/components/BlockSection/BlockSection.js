/*
 *  Scripts - Components - Block Section
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { remote } from '../../config/remote.js';
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

        .c-block-section__text c-heading {
          display: var(
            --block-section-heading-display
          );
        }

        .c-block-section-heading {

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
    this.url = remote.url;
  }

  firstUpdated() {
    if (this.backgroundColor === 'gray' || this.data.GrayBackground) {
      this.shadowRoot.host.style.setProperty('--block-section-bg-color', 'var(--color-bg-subtle)');
    } else {
      this.shadowRoot.host.style.setProperty('--block-section-bg-color', 'white');
    }

    if (this.layout === 'center' || this.data.Layout === 'Centered') {
      this.shadowRoot.host.style.setProperty('--block-section-align', 'center');
      this.shadowRoot.host.style.setProperty('--block-section-columns', '1fr');
    } else {
      this.shadowRoot.host.style.setProperty('--block-section-columns', '1fr 1fr');
    }

    if (this.data.Heading === null) {
      this.shadowRoot.host.style.setProperty('--block-section-heading-display', 'none');
    } else {
      this.shadowRoot.host.style.setProperty('--block-section-heading-display', 'block');
    }
  }

  render() {
    return html`
      ${this.data.Layout === 'TextLeft' ? html`
          <div
            class="
              o-media-block
              o-media-block--split-flush-end
              c-block-section__inner
            "
          >
            <div
              class="
                o-media-block__item
                c-block-section__text
              "
            >
              <c-heading
                text="
                  ${this.data.Heading}
                "
                textAlign="left"
                size="medium"
              >
              </c-heading>
              <c-text-block
                content=${JSON.stringify(this.data.Paragraphs)}
                backgroundColor="transparent"
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
        ` : this.data.Layout === 'Centered' ? html`
          <div
            class="
              o-block
              o-block--narrow
              c-block-section__inner
            "
          >
            <div
              class="
                o-media-block__item
                c-block-section__text
              "
            >
              <c-heading
                text="
                  ${this.data.Heading}
                "
                textAlign="left"
                size="medium"
              >
              </c-heading>
              <c-text-block
                content=${JSON.stringify(this.data.Paragraphs)}
                backgroundColor="transparent"
                isFlush=true
              >
              </c-text-block>
            </div>
            <div
              class="
                o-media-block__item
                c-block-section__image
                u-padding-horizontal-10-percent
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
              c-block-section__inner
            "
          >
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
            <div
              class="
                o-media-block__item
                c-block-section__text
              "
            >
              <c-heading
                text="
                  ${this.data.Heading}
                "
                textAlign="left"
                size="medium"
              >
              </c-heading>
              <c-text-block
                content=${JSON.stringify(this.data.Paragraphs)}
                backgroundColor="transparent"
                isFlush=true
              >
              </c-text-block>
            </div>

          </div>
          `}

    `;
  }

}