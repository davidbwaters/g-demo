/*
 *  Scripts - Components - Details
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { remote } from '../../config/remote.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class Details extends LitElement {
  static get styles() {
    return [initialize, objects, utilities, css`

      :host {
        display: block;
      }

      .c-details__items {
          align-content: center;
          column-gap: 1rem;
          display: grid;
          font-size: calc(var(--text-size-normal) * 1);
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          justify-content: center;
          line-height: var(--line-height-title-normal-light);
          padding: 0;
          row-gap: 2rem;
        }

        @media (min-width:60em) {

          .c-details__items {
            font-size: var(--text-size-small);
            row-gap: 1rem;
          }

        }

        .c-details__item {
          align-content: flex-start;
          align-items: center;
          display: grid;
          row-gap: 1.25rem;
          text-align: center;
        }

        .c-details__heading {
          text-align: center;
        }

        .c-details__item-image {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 10rem;
          margin-left: auto;
          margin-right: auto;
          height: 6rem;
          width: 6rem;
        }

        @media (min-width:60em) {

          .c-details__item-image {
            width: 6rem;
          }

        }

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.url = remote.url;
  }

  firstUpdated() {}

  render() {
    return html`
      <div class="o-section-block">
        <div class="o-block o-block--narrow">
          <img
            src=${this.url + this.data.Image.url}
            alt=${this.data.Image.AlternativeText}
          >
        </div>
        <div class="o-block">
          <c-heading
            class="c-details__heading"
            data=${JSON.stringify(this.data.Heading)}
          >
          </c-heading>
        </div>
        <div class="o-media-block o-media-block--split">
          <div class="o-media-block__item">

            <c-text-block data=${JSON.stringify(this.data)}>
            </c-text-block>
          </div>
          <div class="o-media-block__item">
            <ul class="o-media-block__item c-details__items">
              ${this.data.Details.map(i => html`
                <li class="c-details__item">
                  <div
                    class="c-details__item-image"
                    style="background-image: url(${this.url + i.Image.url})"
                  >
                  </div>
                  <span>${i.Description}</span>
                </li>
              `)}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

}