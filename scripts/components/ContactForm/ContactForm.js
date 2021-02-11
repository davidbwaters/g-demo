/*
 *  Scripts - Components - Contact Form
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { remote } from '../../config/remote.js';
import { buttons } from '../../styles/components.buttons.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
import anime from '../../../modules/animejs/lib/anime.es.js';
export class ContactForm extends LitElement {
  static get styles() {
    return [initialize, objects, buttons, utilities, css`
        :host {
          align-content: center;
          background-color: var(--contact-form-background);
          display: grid;
          grid-template-columns: 90%;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          padding-bottom: 6rem;
          padding-top: 6rem;
          row-gap: 2rem;
          text-align: center;

          --contact-form-field-transform: scale(.7) translateY(-2.2em);
        }

        @media (min-width:40em) {

          :host {
            grid-template-columns: 80%;
          }
        }

        @media (min-width:60em) {

          :host {
            grid-template-columns: 80%;
          }
        }


        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-internal-autofill-selected,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        textarea:-internal-autofill-selected,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus,
        select:-internal-autofill-selected
        {
          background-color: var(--contact-form-background) !important;
          outline: none !important;
          transition: background-color 5000s;
        }

        .c-contact-form__form-wrapper {
          position: relative;
          margin-left: auto;
          margin-right: auto;
          max-width: 58rem;
          width: 100%;
        }

        .c-contact-form__form {
          display: grid;
          text-align: left;
        }

        .c-contact-form__field,
        .c-contact-form__message-field {
          display: grid;
          grid-template-columns: 1fr;
          line-height: 1.6;
          padding-top: 2em;
          overflow-x: hidden;
          position: relative;
        }

        .c-contact-form__field::after,
        .c-contact-form__message-field::after {
          content: '';
          height: 2px;
          position: absolute;
          width: 100%;
          will-change: transform;
        }

        .c-contact-form__field label,
        .c-contact-form__message-field label {
          color: var(--color-fg-subtle);
          position: absolute;
          top: 2.5em;
          transition: all .5s;
          transform-origin: left center;
          will-change: transform, font-size;
        }

        .c-contact-form__field input,
        .c-contact-form__message-field textarea {
          background-color: var(--contact-form-background);
          border-bottom: solid 1px var(--color-fg-faint);
          border-left: none;
          border-right: none;
          border-top: none;
          box-sizing: border-box;
          font: inherit;
          line-height: 1.5;
          padding-bottom: .5em;
          padding-top: .5em;
        }

        .c-contact-form__field input:focus,
        .c-contact-form__message-field textarea:focus {
          outline: none;
        }

        .c-contact-form__field input:focus +
        label,
        .c-contact-form__message-field textarea:focus +
        label {
          color: var(--color-fg-faint);
          transform:
            var(--contact-form-field-transform);
        }

        .c-contact-form__line {
          background-color: var(--color-fg-contrast);
          bottom: 0;
          display: block;
          height: 1px;
          position: absolute;
          transform:  translateX(-100%);
          transition: all .5s;
          width: 100%;
          will-change: transform;
        }

        .c-contact-form__field input:focus +
        label + .c-contact-form__line,
        .c-contact-form__field textarea:focus +
        label + .c-contact-form__line  {
          transform: translateX(0);
        }

        .c-contact-form__message-field {
          margin-bottom: 3rem;
        }
        .c-contact-form__message {
          height: var(--contact-form-message-height);
          resize: none;
          transition: all .25s;
          will-change: height;
        }

        .c-contact-form__submit {
          margin-left: auto;
        }

        .c-contact-form__form-wrapper.has-succeeded {
          background-color: var(--color-bg);
          color: var(--color-success);
        }

        .c-contact-form__form-wrapper.has-failed {
          background-color: var(--color-bg);
          color: var(--color-error);
        }

        .c-contact-form__success,
        .c-contact-form__fail {
          font: var(--heading-font);
          font-size: var(--text-size-large);
          font-weight: var(--font-normal-weight);
          opacity: 0;
          font-weight: bold;
          pointer-events: none;
          position: absolute;
          text-align: center;
          transition: all 0.25s ease 0s;
          transform: translateY(-100%);
          top: 50%;
          width: 100%;
          will-change: transform, opacity;
        }

        .has-succeeded .c-contact-form__success,
        .has-failed .c-contact-form__fail {
          opacity: .99;
        }

        .has-succeeded .c-contact-form__form,
        .has-failed .c-contact-form__form {
          opacity: 0;
          pointer-events: none;
        }
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      formOnly: {
        type: Boolean
      },
      heading: {
        type: String
      },
      text: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.endpoint = remote.formEndpoint;
    this.url = remote.url;
  }

  firstUpdated() {
    if (this.data) {
      this.heading = this.data.Heading;
      this.text = this.data.Text;
    }

    console.log(this.data);

    if (this.data.GrayBackground) {
      this.shadowRoot.host.style.setProperty('--contact-form-background', 'var(--color-bg-subtle)');
    } else {
      this.shadowRoot.host.style.setProperty('--contact-form-background', 'var(--color-bg)');
    }

    this._formWrapperEl = this.shadowRoot.querySelector('.c-contact-form__form-wrapper');
    this._formEl = this.shadowRoot.querySelector('.c-contact-form__form'); // console.log(this._formEl)

    this._textAreaEl = this.shadowRoot.querySelector('.c-contact-form__message');
    this._submitEl = this.shadowRoot.querySelector('.c-contact-form__submit');
    this._isValid = {};
    this.shadowRoot.addEventListener('input', e => {
      if (e.target === this._textAreaEl) {
        this._autoExpand(this._textAreaEl, '--contact-form-message-height');
      }

      if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
        this._filledCheck(e.target);
      }

      if (this._isValid['Name'] && this._isValid['Email'] && this._isValid['Message']) {
        this._submitEl.disabled = false;
      } else {
        this._submitEl.disabled = true;
      }
    });
  }

  _filledCheck(target) {
    const name = target.getAttribute('name');
    const isEmail = name === 'Email';

    if (target.value.length > 0) {
      target.parentElement.querySelector('label').style.transform = 'var(--contact-form-field-transform)';

      if (!isEmail) {
        this._isValid[name] = true;
      } else {
        this._validateEmail(target);
      }
    } else {
      target.parentElement.querySelector('label').style.transform = '';
      this._isValid[name] = false;
    }
  }

  _validateEmail(target) {
    const input = target.value;

    if (input && /(^\w.*@\w+\.\w)/.test(input)) {
      this._isValid['Email'] = true;
    }
  }

  _autoExpand(textAreaEl, property) {
    this.shadowRoot.host.style.setProperty(property, 'inherit');
    const computed = window.getComputedStyle(textAreaEl);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10) + textAreaEl.scrollHeight + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    this.shadowRoot.host.style.setProperty(property, height + 'px');
  }

  transitionIn() {
    const targets = this.shadowRoot.querySelectorAll('[data-form-item]');
    targets.forEach(el => {
      el.style.opacity = 0;
    });
    setTimeout(() => {
      anime({
        targets: targets,
        duration: 600,
        opacity: 1,
        delay: anime.stagger(600),
        easing: 'easeOutSine'
      });
    }, 400);
  }

  async postFormDataAsJson({
    url,
    formData
  }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: formDataJsonString
    };
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorMessage = await response.text();

      this._formWrapperEl.classList.add('has-failed');

      setTimeout(() => {
        this._formWrapperEl.classList.remove('has-failed');
      }, 5000);
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async handleSubmitClick(event) {
    if (!event.target.disabled) {
      this._formEl.submit();
    }
  }

  handleFocus(event) {
    this._formEl.classList.toggle('is-focused');
  }

  handleBlur(event) {
    this._formEl.classList.toggle('is-focused');
  }

  async handleSubmit(event) {
    event.preventDefault();
    const form = this._formEl;
    const url = form.action;

    try {
      const formData = new FormData(form);
      const responseData = await this.postFormDataAsJson({
        url,
        formData
      });

      this._formWrapperEl.classList.add('has-succeeded');

      setTimeout(() => {
        this._formWrapperEl.classList.remove('has-succeeded');

        let event = new CustomEvent('contactSubmit', {
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
      }, 6000); // console.log({ responseData })
    } catch (error) {
      this._formWrapperEl.classList.add('has-failed');

      setTimeout(() => {
        this._formWrapperEl.classList.remove('has-failed');
      }, 5000);
    }
  }

  render() {
    return html`
      ${!this.formOnly ? html`

          <c-heading
            class="c-contact-form__heading"
            data=${JSON.stringify(this.data.Heading)}
          >
          </c-heading>
          <c-text-block
            class="c-contact-form__text"
            data=${JSON.stringify(this.data)}
          >
          </c-text-block>
        ` : html`
          <div class="c-contact-form__content">
            <c-heading
              class="c-contact-form__heading"
              data=${JSON.stringify(this.data.Heading)}
            >
            </c-heading>
            <c-text-block
              data=${JSON.stringify(this.data)}
            >
            </c-text-block>
          </div>
        `}

      <div class="c-contact-form__form-wrapper">

        <form
          class="c-contact-form__form"
          action=${this.url + this.endpoint}
          id="contact-form"
          @submit=${this.handleSubmit}
        >
          <div
            class="c-contact-form__field"
            data-form-item
          >

            <input
              class="c-contact-form__name"
              type="text"
              name="Name"
              id="name"
            >
            <label
              for="name"
              class="c-contact-form__name-label"
            >
              Name
            </label>
            <span class="c-contact-form__line">
            </span>
          </div>
          <div
            class="c-contact-form__field"
            data-form-item
          >
            <input
              class="c-contact-form__email"
              type="email"
              name="Email"
              id="email"
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            >
            <label
              for="email"
              class="c-contact-form__email-label"
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            >
              Email
            </label>
            <span class="c-contact-form__line">
            </span>
          </div>
          <div
            class="c-contact-form__message-field"
            data-form-item
          >
            <textarea
              class="c-contact-form__message"
              name="Message"
              id="message"
              rows="1"
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <label
              for="message"
              class="c-contact-form__message-label"
            >
              Message
            </label>

            <span class="c-contact-form__line">
            </span>
          </div>


          <button
            @click=${this._handleSubmitClick}
            disabled=true
            id="submit"
            class="
              c-contact-form__submit
              c-button
              c-button--icon
              c-button--inverse
              c-button--flush
              c-button--round
              c-button--large
            "
          >
            <c-icon icon="angle-right"></c-icon>
          </button>
        </form>
        <div class="c-contact-form__success">
          Success! <br> Message sent.
        </div>

        <div class="c-contact-form__fail">
          Oops! <br> There was a problem. Please submitting again.
        </div>

      </div>
    `;
  }

}