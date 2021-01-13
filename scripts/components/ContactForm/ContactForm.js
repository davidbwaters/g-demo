/*
 *  Scripts - Components - Contact Form
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
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

        --contact-form-field-transform: scale(.8) translateY(-2em);
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
      }

      .c-contact-form__field {
        display: grid;
        grid-template-columns: 1fr;
        line-height: 1.5;
        margin-top: 2em;
        position: relative;
      }

      .c-contact-form__field label {
        color: var(--color-subtle-dark-4);
        position: absolute;
        top: .5em;
        transition: all .5s;
        transform-origin: left center;
        will-change: transform, font-size;
      }

      .c-contact-form__field input,
      .c-contact-form__field textarea {
        border-bottom: solid 1px var(--color-subtle-dark-4);
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
        border-bottom: solid 1px var(--color-subtle-dark-3);
        outline: none;
      }

      .c-contact-form__field input:focus +
      label,
      .c-contact-form__field textarea:focus +
      label {
        color: var(--color-subtle-dark-5);
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
        font-size: 2rem;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        text-align: center;
        transition: all .25s;
        top: 8rem;
        width: 100%;
        will-change: opacity;
      }

      .c-contact-form__form-wrapper.has-succeeded {
        box-shadow: 0 0 0 2px var(--color-gw-green);
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

  firstUpdated() {
    if (this.data) {
      this.heading = this.data.Heading;
      this.text = this.data.Text;
    }

    this.url = 'https://admin.guntherwerks.info/inquiries';
    this._formWrapperEl = this.shadowRoot.querySelector('.c-contact-form__form-wrapper');
    this._textAreaEl = this.shadowRoot.querySelector('textarea');
    this._submitEl = this.shadowRoot.querySelector('[type="submit"]');
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

  async handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
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
      <c-heading
        class="c-contact-form__heading"
        text=${this.data.Heading}
      >
      </c-heading>
      <c-text-block
        content=${this.data.Text}
        isFlush=true
      >
      </c-text-block>

      <div class="c-contact-form__form-wrapper">

        <form
          class="c-contact-form__form"
          action=${this.url}
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
            >
            <label
              for="email"
              class="c-contact-form__email-label"
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
            ></textarea>
            <label
              for="message"
              class="c-contact-form__message-label"
            >
              Message
            </label>
          </div>

          <input
            type="submit"
            value="Submit"
            disabled=true
            id="submit"
            class="c-contact-form__submit"
          >
        </form>
        <div class="c-contact-form__success">
          Success! Message sent.
        </div>

      </div>
    `;
  }

}