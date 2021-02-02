/*
 *  Scripts - Components - Icon
 */
import { html, css } from '../../../modules/lit-element.js';
import { Component } from '../../bases/Component.js';
import { initialize } from '../../styles/initialize.js';
import { logoResponsive } from '../../styles/components.logo-responsive.js';
import { remote } from '../../config/remote.js';
export class Footer extends Component {
  static get styles() {
    return [initialize, logoResponsive, css`
        :host {

        --logo-small-light: url('/images/Branding/Logo G - Light.svg');
        --logo-small-dark: url('/images/Branding/Logo G - Dark.svg');
        --logo-medium-light: url('/images/Branding/Logo Initials - Light.svg');
        --logo-medium-dark: url('/images/Branding/Logo Initials - Dark.svg');
        --logo-large-light: url('/images/Branding/Logo - Light.svg');
        --logo-large-dark: url('/images/Branding/Logo - Dark.svg');

          background-color: var(--color-bg-inverse);
          bottom: 0;
          color: var(--color-fg-inverse);
          display: block;
          padding-left: 10%;
          padding-right: 10%;
          position: fixed;
          width: 100%;
          z-index: var(--footer-z-index);
        }

        :host c-text-block {
          color: var(--color-fg-inverse);
        }

        .c-footer__content {
          align-content: flex-start;
          box-sizing: border-box;
          color: var(--color-fg-inverse);
          column-gap: 2rem;
          display: grid;
          font-size: .8rem;
          grid-auto-flow: column;
          grid-auto-columns: max-content;
          grid-template-rows: 1fr 1fr;
          justify-content: space-between;
          margin-left: auto;
          margin-right: auto;
          max-width: 60rem;
          padding-bottom: 8rem;
          padding-top: 3rem;
          width: 100%;
          align-content: center;
        }

        @media (min-width: 40em) {

          .c-footer__content {
            grid-template-rows: 1fr;
          }

        }

        .c-footer__column,
        .c-footer__column-info {
          align-content: flex-start;
          display: grid;
        }

        .c-footer__column {
          row-gap: .5rem;
        }

        .c-footer__column-info {
          margin-top: -3px;
          row-gap: 1.5rem;
        }

        .c-footer__title {
          font-size: var(--text-size-title-tiny);
          font-weight: var(--font-weight-title-tiny);
          letter-spacing: var(--letter-spacing-title-tiny);
          line-height: var(--line-height-title-tiny);
          margin-bottom: .25rem;
          text-transform: uppercase;
        }

        .c-footer__icon {
          font-size: 1.4em;
        }

        p {
          margin-bottom: 0;
        }

        a {
          color: var(--color-fg-inverse-contrast);
        }
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      dataSocial: {
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
    this.setHeight = this.setHeight.bind(this);
    this.dataEndpoint = '/footer';
    this.contactDataEndpoint = '/contact';
    window.addEventListener('resize', this.setHeight);
  }

  firstUpdated() {
    this.setHeight();
  }

  setHeight() {
    const size = this.getBoundingClientRect();
    document.documentElement.style.setProperty('--footer-height', size.height / 16 + 'rem');
  }

  async _getData() {}

  async performUpdate() {
    this.data = await this.getApiData(this.dataEndpoint);
    this.contactData = await this.getApiData(this.contactDataEndpoint); // console.log(this.data)
    // console.log(this.socialData)

    super.performUpdate();
  }

  render() {
    return html`

      <div
        class="c-footer__content"
      >
        <div
          class="
            c-footer__logo
            c-logo-responsive
            c-logo-responsive--light
          "
        >
        </div>

        <div
          class="c-footer__column"
        >
          <div
            class="c-footer__title"
          >
            ${this.data.Column1Title}
          </div>
          ${this.data.Column1Content.map(i => html`
            ${i.__component === 'block.link' ? html`
                  <a href=${i.URL} alt="">
                    ${i.Text}
                  </a>
                ` : html`
                  <p>
                    ${i.Paragraph}
                  </p>
                `}
          `)}
        </div>

        <div
          class="c-footer__column"
        >
          <div
            class="c-footer__title"
          >
            ${this.data.Column2Title}
          </div>
          ${this.data.Column2Content.map(i => html`
            ${i.__component === 'block.link' ? html`
                  <a href=${i.URL} alt="">
                    ${i.Text}
                  </a>
                ` : html`
                  <p>
                    ${i.Paragraph}
                  </p>
                `}
          `)}
        </div>

        <div
          class="
            c-footer__column-info
          "
        >
          <a href=${'mailto:' + this.contactData.EmailAddresses[0].Address}>
            ${this.contactData.EmailAddresses[0].Address}
          </a>
          <c-text-block
            data=${JSON.stringify({
      Text: [{
        Text: this.contactData.ContactInfo[0].TextBlock
      }],
      TextSize: 'small',
      Color: 'inherit'
    })}
          >
          </c-text-block>
          <c-text-block
            data=${JSON.stringify({
      Text: [{
        Text: this.contactData.PhoneNumbers[0].Number
      }],
      TextSize: 'small',
      Color: 'inherit'
    })}
          >
          </c-text-block>

        </div>

        <div
          class="c-footer__column"
        >

          <div
            class="c-footer__items-inline"
          >
            ${this.contactData.SocialLinks.map(i => html`
              <a
                class="
                  c-button
                  c-button--inverse
                  c-button--round
                  c-button--icon
                  c-footer__icon
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

      </div>

    `;
  }

}