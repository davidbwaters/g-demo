/*
 *  Scripts - Pages - Contact
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { buttons } from '../../styles/components.buttons.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
import MagnetMouse from '../../../modules/magnet-mouse.js';
export class ContactPage extends Page {
  static get styles() {
    return [initialize, objects, buttons, utilities, css`

        :host {
          display: block;
          height: 100%;
          padding-top: var(--navbar-height);
          width: 100%;
        }

        .c-contact-page__wrapper {
          margin-top: -1px;
          min-height: 100vh;
        }

        .c-contact-page__main-image {
          align-content: stretch;
          background-position: center center;
          background-size: cover;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-columns: 1fr;
          max-height: calc(100vh - var(--navbar-height));
          min-height: 50vh;
          overflow: hidden;
          top: 0;
        }

        @media(min-width: 40em) {

          .c-contact-page__main-image {
            position: sticky;
          }

        }

        .c-contact-page__main-image-blur,
        .c-contact-page__form-image,
        .c-contact-page__form-image-blur {
          background-position: center center;
          background-size: cover;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
          will-change: opacity;
        }

        .c-contact-page__form-image {
          opacity: .01;
          transition: opacity .5s ease;
        }

        .c-contact-page__main-image-blur,
        .c-contact-page__form-image-blur {
          filter: url(#blurFilterSuper);
          will-change: opacity;
        }

        .is-active .c-contact-page__main-image-blur {
          animation: none;
          opacity: .01;
        }

        .is-active .c-contact-page__form-image {
          opacity: .99;
        }

        .is-active .c-contact-page__form-image-blur {
          animation: fade-in .5s .5s;
          animation-fill-mode: forwards;
          opacity: .99;
        }

        .c-contact-page__main-image-blur {
          animation: fade-in .5s .5s;
          animation-fill-mode: forwards;
          opacity: .99;
        }

        .c-contact-page__form-image-blur {
          opacity: .01;
        }

        .c-contact-page__content-wrapper {
          position: relative;
        }

        .c-contact-page__content {
          display: grid;
          font-size: var(--text-size-small);
          grid-template-columns: 2.5rem 1fr;
          row-gap: 1.5rem;
          transition: opacity 1s ease;
          width: 100%;
          will-change: opacity;
        }

        @media(min-width: 40em) {

          .c-contact-page__content {
            display: grid;
            grid-template-columns: 2.5rem 5fr 2.5rem 3fr;
            row-gap: 1.8rem;
          }

        }

        .is-active .c-contact-page__content {
          transition: opacity 1s ease;
          will-change: opacity;
          opacity: .01;
        }

        .c-contact-text {
          grid-column: 1 / span 2;
        }


        @media(min-width: 40em) {

          .c-contact-text {
            grid-column: 1 / span 4;
          }

        }

        .c-contact-page__content-block {
          display: grid;
          row-gap: .5rem;
        }

        .c-contact-page__content-block-wide {
          display: grid;
          grid-column: span 1;
          row-gap: .5rem;
        }

        @media(min-width: 40em) {

          .c-contact-page__content-block-wide {
            grid-column: span 3;
          }

        }

        .c-contact-page__content-icon {
          font-size: 1.2rem;
          margin-top: -.5rem;
        }

        .c-contact-page__content-items {
          display: grid;
          row-gap: .75rem;
        }

        .c-contact-page__content-item {
          display: grid;
          row-gap: .25rem;
        }

        .c-contact-page__form-wrapper {
          background-color: var(--color-bg);
          opacity: .01;
          pointer-events: none;
          position: absolute;
          transition: opacity 1s ease;
          width: 100%;
          will-change: opacity;
        }

        .c-contact-page__form-wrapper.is-active {
          background-position: center center;
          background-size: cover;
          opacity: .99;
          pointer-events: initial;
        }

        .c-contact-page__close-button {
          opacity: .01;
          position: absolute;
          left: 1.5rem;
          top: 1.5rem;
          transition: opacity 1s ease;
          will-change: opacity;
          z-index: 1;
        }

        .c-contact-page__close-button.is-active {
          background-position: center center;
          background-size: cover;
          opacity: .99;
          pointer-events: initial;
        }

        @keyframes fade-in {
          0% {
            opacity: .99;
          }
          100% {
            opacity: .01;
          }
        }

      `];
  }

  async preload() {
    await this.imagePreloader([this.data.MainImage.url]);
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

  firstUpdated() {
    super.addBlurFilter(20);
    this.contactWrapperEl = this.shadowRoot.querySelector('.c-contact-page__content-wrapper');
    this.mainImageEl = this.shadowRoot.querySelector('.c-contact-page__main-image');
    this.formWrapper = this.shadowRoot.querySelector('.c-contact-page__form-wrapper');
    this.closeEl = this.shadowRoot.querySelector('.c-contact-page__close-button');
    this.buttonEls = this.shadowRoot.querySelectorAll('c-button');
    this.formEl = this.shadowRoot.querySelector('.c-contact-form');

    let toggle = () => {
      this.formToggle();
    };

    this.addEventListener('contactSubmit', () => {
      toggle();
    });
    window.dispatchEvent(new Event('resize'));
  }

  formToggle() {
    this.mainImageEl.classList.toggle('is-active');
    this.formWrapper.classList.toggle('is-active');
    this.closeEl.classList.toggle('is-active');
    this.contactWrapperEl.classList.toggle('is-active');
  }

  transitionIn() {}

  render() {
    return html`

      <div
        class="
          o-media-block
          o-media-block--split-flush-start
          o-media-block--align-stretch
          c-contact-page__wrapper
          u-row-gap-flush@mobile
        "
      >
        <div
          class="
            o-media-block__item
            c-contact-page__main-image
          "
          style=${'background-image: url(' + this.url + this.data.MainImage.url + ');'}
        >
          <div
            class="
              c-contact-page__main-image-blur
            "
            style=${'background-image: url(' + this.url + this.data.MainImage.url + ');'}
          >
          </div>
          <div
            class="
              c-contact-page__form-image
            "
            style=${'background-image: url(' + this.url + this.data.FormImage.url + ');'}
          >
            <div
              class="
                c-contact-page__form-image-blur
              "
              style=${'background-image: url(' + this.url + this.data.FormImage.url + ');'}
            >
            </div>
          </div>
        </div>
        <div
          class="
            o-media-block__item
            c-contact-page__content-wrapper
          "
        >
          <div class="
            o-section-block
            o-section-block--spacing-small
            u-text-align-left
            u-justify-items-start
            c-contact-page__content-inner
          ">
            <div
              class="
                c-contact-page__content
                u-align-items-start
              "
            >

              <div class="c-contact-text">
                <c-heading
                  class="c-contact-text"
                  data=${JSON.stringify(this.data.Heading)}
                ></c-heading>
                <c-text-block
                  class="c-contact-text-block"
                  data=${JSON.stringify({
      Text: [{
        Text: this.data.Text
      }],
      TextSize: 'small'
    })}
                ></c-text-block>
              </div>

              <c-icon
                class="c-contact-page__content-icon"
                icon="pin"
              >
              </c-icon>
              <div
                class="c-contact-page__content-block"
              >
                <div class="
                    u-text-title-tiny
                    u-text-uppercase
                  ">
                  Location
                </div>
                ${this.data.ContactInfo.map(i => html`
                  <c-text-block
                    data=${JSON.stringify({
      Text: [{
        Text: i.TextBlock
      }],
      TextSize: 'small'
    })}
                  >
                  </c-text-block>
                `)}
              </div>

              <c-icon
                class="c-contact-page__content-icon"
                icon="clock"
              >
              </c-icon>
              <div
                class="c-contact-page__content-block"
              >
                <div class="
                  u-text-title-tiny
                  u-text-uppercase
                ">
                  Hours
                </div>
                <c-text-block
                  data=${JSON.stringify({
      Text: [{
        Text: this.data.BusinessHours
      }],
      TextSize: 'small'
    })}
                >
                </c-text-block>
              </div>

              <c-icon
                class="c-contact-page__content-icon"
                icon="at"
              >
              </c-icon>
              <div
                class="c-contact-page__content-block"
              >
                <div
                  class="c-contact-page__content-items"
                >
                  ${this.data.EmailAddresses.map(i => html`
                    <div
                      class="
                        c-contact-page__content-item
                      "
                    >
                      <div class="
                        u-text-title-tiny
                        u-text-uppercase
                      ">
                        ${i.Label}
                      </div>
                      <a href=${'mailto:' + i.Address}>
                        ${i.Address}
                      </a>
                    </div>
                  `)}
                </div>
              </div>

              <c-icon
                class="c-contact-page__content-icon"
                icon="phone"
              >
              </c-icon>
              <div
                class="c-contact-page__content-block"
              >
                <div
                  class="c-contact-page__content-items"
                >
                  ${this.data.PhoneNumbers.map(i => html`
                    <div
                      class="
                        c-contact-page__content-item
                      "
                    >
                      <div class="
                        u-text-title-tiny
                        u-text-uppercase
                      ">
                        ${i.Label}
                      </div>
                      <div>
                        ${i.Number}
                      </div>
                    </div>
                  `)}
                </div>
              </div>


              <c-icon
                class="c-contact-page__content-icon"
                icon="ello"
              >
              </c-icon>
              <div
                class="c-contact-page__content-block-wide"
              >
                <div class="
                    u-text-title-tiny
                    u-text-uppercase
                  ">
                  Social
                </div>
                <div
                  class="c-contact-page__content-items-inline"
                >
                  ${this.data.SocialLinks.map(i => html`
                      <a
                        class="
                          c-button
                          c-button--inverse
                          c-button--round
                          c-button--icon
                        "
                        href=${i.URL}

                        title=${i.Type}
                      >
                        <c-icon
                          class="c-contact-page__social-icon"
                          icon=${i.Type.toLowerCase()}
                        >
                        </c-icon>
                      </a>
                  `)}
                </div>
              </div>

              <c-icon
                class="c-contact-page__content-icon"
                icon="feather"
              >
              </c-icon>
              <div
                class="c-contact-page__content-block-wide"
              >
                <button
                  class="
                    c-button
                    c-button--inverse
                    c-button--flush
                    c-button--large
                  "
                  @click=${this.formToggle}
                >
                Send a Message
                <c-icon icon="angle-right">
                </c-icon>
                </button>
              </div>

            </div>

            <button
              class="
                c-button
                c-button--inverse
                c-button--icon
                c-button--round
                c-contact-page__close-button
              "
              @click=${this.formToggle}
            >
              <c-icon icon="arrow-left">
              </c-icon>
            </button>
            <div class="c-contact-page__form-wrapper">
              <c-contact-form
                data=${JSON.stringify(this.data)}
                formOnly = true
              >
              </c-contact-form>
            </div>
          </div>
        </div>
      </div>

    `;
  }

}