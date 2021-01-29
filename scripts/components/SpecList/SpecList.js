/*
 *  Scripts - Components - SpecList
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
import { remote } from '../../config/remote.js';
export class SpecList extends LitElement {
  static get styles() {
    return [initialize, objects, utilities, css`
        :host {
          background-color: var(--speclist-background-color);
          display: block;
          margin-top: -2px;
        }

        .c-speclist__heading {
          font-size: var(--text-size-heading-medium);
          font-weight: var(--font-bolder-weight);
          margin-bottom: 2.5rem;
        }

        .c-speclist__list {
          display: grid;
          list-style-type: none;
          padding: 0;
        }

        .c-speclist__row {
          display: grid;
          grid-auto-columns: 1fr;
          grid-auto-flow: column;
          margin-bottom: 1rem;
        }

        .c-speclist__item-title,
        .c-speclist__row-title {
          display: block;
          color: var(--color-fg-contrast);
          font-size: var(--text-size-title-normal);
          font-weight: var(--font-weight-title-normal);
          letter-spacing: var(--letter-spacing-title-normal);
          line-height: 1rem;
          text-transform: uppercase;
        }

        .c-speclist__item-text,
        .c-speclist__row-text {
          display: block;
          color: var(--color-fg);
          font-size: var(--text-size-title-normal-light);
          font-weight: var(--font-weight-title-normal-light);
          letter-spacing: var(--letter-spacing-title-normal-light);
          line-height: 1rem;
        }

        .c-speclist__item-title {
          margin-bottom: 0.8em;
        }

        .c-speclist__item-text {
          margin-bottom: 0.4em;
        }
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      Component: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.url = remote.url;
  }

  firstUpdated() {
    if (this.data.GrayBackground) {
      this.shadowRoot.host.style.setProperty('--speclist-background-color', 'var(--color-bg-subtle)');
    } else {
      this.shadowRoot.host.style.setProperty('--speclist-background-color', 'var(--color-bg)');
    }
  }

  render() {
    return html`
      <div class="o-section-block">

      <c-heading
        data=${JSON.stringify({
      Text: this.data.Heading
    })}
      >
      </c-heading>

      ${this.Component === 'rows' ? html`
          <div class="o-media-block o-media-block--split">
            <img
              src=${this.url + this.data.Image.url}
              alt=${this.data.Image.alternativeText}
            >
            <div>
              <ul class="c-speclist__list">
                ${this.data.Specs.map(i => html`
                  <li class="c-speclist__row">
                    <div class="c-speclist__row-title">
                      ${i.Title}
                    </div>
                    ${i.Item.map(j => html`
                      <div class="c-speclist__row-text">
                        ${j.Text}
                      </div>
                    `)}
                  </li>
                `)}
              </ul>
            </div>
          </div>
        ` : html`
          <div class="o-block">
            <masonry-layout>
              ${this.data.Columns.map(i => html`
                <div class="c-speclist__item">
                  <div class="c-speclist__item-title">
                    ${i.Title}
                  </div>
                  ${i.Field.map(j => html`
                    <div class="c-speclist__item-text">
                      ${j.Text}
                    </div>
                  `)}
                </div>
              `)}
            </masonry-layout>
          </div>
        `}
      </div>
    `;
  }

}