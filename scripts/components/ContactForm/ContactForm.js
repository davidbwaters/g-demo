/*
 *  Scripts - Components - Contact Form
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { remote } from '../../config/remote.js';
export class ContactForm extends LitElement {
  static get styles() {
    return css`
      :host {
        align-content: center;
        display: grid;
        grid-template-columns: 90%;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        max-width: 60rem;
        padding-bottom: 6rem;
        padding-top: 6rem;
        row-gap: 2rem;
        text-align: center;

        --contact-form-field-transform: scale(.6) translateY(-2.2em);
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
        background-color: white !important;
        outline: none !important;
        transition: background-color 5000s;
      }

      .c-contact-form__form-wrapper {
        position: relative;
      }

      .c-contact-form__form {
        display: grid;
        text-align: left;
      }

      .c-contact-form__field {
        display: grid;
        font-size: var(--text-size-medium);
        grid-template-columns: 1fr;
        line-height: 1.6;
        margin-top: 2em;
        position: relative;
      }

      .c-contact-form__field::after {
        content: '';
        height: 2px;
        position: absolute;
        width: 100%;
        will-change: transform;
      }

      .c-contact-form__field label {
        color: var(--color-fg-subtle);
        position: absolute;
        top: .5em;
        transition: all .5s;
        transform-origin: left center;
        will-change: transform, font-size;
      }

      .c-contact-form__field input,
      .c-contact-form__field textarea {
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
      .c-contact-form__field textarea:focus {
        border-bottom: solid 1px var(--color-fg-contrast);
        outline: none;
      }

      .c-contact-form__field input:focus +
      label,
      .c-contact-form__field textarea:focus +
      label {
        color: var(--color-fg-faint);
        transform:
          var(--contact-form-field-transform);
      }

      .c-contact-form__message {
        height: var(--contact-form-message-height);
        margin-bottom: 3rem;
        resize: none;
        transition: all .25s;
        will-change: height;
      }

      .c-contact-form__submit {
        background-color: white;
        background-image: url(
          '/images/Components/Submit.svg'
        );
        background-position: center right;
        background-repeat: no-repeat;
        border: none;
        cursor: pointer;
        font-size: .8rem;
        height: 3rem;
        justify-self: flex-end;
        letter-spacing: .05rem;
        line-height: 1rem;
        opacity: .8;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-right: 3.5rem;
        padding-top: 1rem;
        position: relative;
        text-transform: uppercase;
        transition: opacity .2s;
        width: auto;
        will-change: opacity;
      }

      .c-contact-form__submit:hover {
        background-blend-mode: exclusion;
        opacity: .99;
      }

      .c-contact-form__submit:focus {
        outline: none;
      }

      .c-contact-form__submit[disabled],
      .c-contact-form__submit[disabled]:hover {
        background-blend-mode: normal;
        cursor: not-allowed;
        opacity: .5;
      }

      .c-contact-form__success {
        font-size: var(--text-size-heading-small);
        font-weight: var(--font-bolder-weight);
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

      .c-contact-form__form-wrapper.has-succeeded {
        background-color: var(--color-success);
        color: var(--color-fg-inverse);
      }

      .has-succeeded .c-contact-form__success {
        opacity: .99;
      }

      .has-succeeded .c-contact-form__form {
        opacity: 0;
        pointer-events: none;
      }
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
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

    this._formWrapperEl = this.shadowRoot.querySelector('.c-contact-form__form-wrapper');
    this._formEl = this.shadowRoot.querySelector('.c-contact-form__form');
    console.log(this._formEl);
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
    console.log(computed.getPropertyValue('padding-bottom'));
    console.log(computed.getPropertyValue('padding-top'));
    console.log(computed.getPropertyValue('border-top-width'));
    console.log(computed.getPropertyValue('border-bottom-width'));
    console.log(textAreaEl.scrollHeight);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10) + textAreaEl.scrollHeight + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    this.shadowRoot.host.style.setProperty(property, height + 'px');
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
    event.preventDefault();

    this._formEl.classList.toggle('is-focused');
  }

  handleBlur(event) {
    event.preventDefault();

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

      console.log({
        responseData
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return html`
      ${!this.FormOnly ? html`
          <c-heading
            class="c-contact-form__heading"
            data=${JSON.stringify(this.data.Heading)}
          >
          </c-heading>
          <c-text-block
            data=${JSON.stringify(this.data)}
          >
          </c-text-block>
        ` : html` `}

      <div class="c-contact-form__form-wrapper">

        <form
          class="c-contact-form__form"
          action=${this.url + this.endpoint}
          id="contact-form"
          @submit=${this.handleSubmit}
        >
          <div class="c-contact-form__field">

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
          </div>
          <div class="c-contact-form__field">
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
          </div>
          <div class="
            c-contact-form__field
            c-contact-form__message-field
          ">
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
          </div>


          <button
            @click=${this._handleSubmitClick}
            disabled=true
            id="submit"
            class="
              c-contact-form__submit
              c-button
              c-button--icon
              c-button--ghost
            "
          >
            <c-icon icon="angle-right"></c-icon>
          </button>
        </form>
        <div class="c-contact-form__success">
          Success! Message sent.
        </div>

      </div>
    `;
  }

}