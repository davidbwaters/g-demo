/*
 *  Scripts - Pages - Contact
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class ContactPage extends Page {
  static get styles() {
    return [initialize, objects, utilities, css`

        :host {
          display: block;
          height: 100%;
          padding-top: var(--navbar-height);
          width: 100%;
        }

        .c-contact-page__wrapper {
          height: 100%;
        }

        .c-contact-page__main-image {
          background-position: center center;
          background-size: cover;
        }

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribute: false
      },
      loaded: {
        type: Boolean,
        reflect: true
      },
      loadProgress: {
        type: Number,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.dataEndpoint = '/contact';
  }

  firstUpdated() {}

  transitionIn() {}

  render() {
    return html`

      <div
        class="
          o-media-block
          o-media-block--split-flush-start
          o-media-block--align-stretch
          c-contact-page__wrapper
        "
      >
        <div
          class="
            o-media-block__item
            c-contact-page__main-image
          "
          style=${'background-image: url(' + this.url + this.data.MainImage.url + ');'}
        >
        </div>
        <div
          class="
            o-media-block__item
            c-contact-page__content
          "
        >

        </div>
      </div>

      </div>

    `;
  }

}