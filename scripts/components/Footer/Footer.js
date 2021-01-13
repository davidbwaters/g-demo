/*
 *  Scripts - Components - Footer
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import { generic } from '../../styles/generic.js';
import { logoResponsive } from '../../styles/logoResponsive.js';
export class Footer extends LitElement {
  static get styles() {
    return [generic, logoResponsive, css`
        :host {
          background-color: var(--color-subtle-dark-2);
          bottom: 0;
          color: white;
          padding-left: 10%;
          padding-right: 10%;
          position: fixed;
          width: 100%;
          z-index: var(--footer-z-index);
        }

        .c-footer__content {
          align-content: flex-start;
          box-sizing: border-box;
          color: var(--color-subtle-light-4);
          column-gap: 2rem;
          display: grid;
          font-size: .8rem;
          grid-auto-flow: column;
          grid-auto-columns: min-content;
          grid-template-rows: 1fr 1fr;
          justify-content: space-between;
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

        .c-footer__social-link {
          margin-bottom: .5rem;
          width: 1.5rem;
        }

        p {
          margin-bottom: 0;
        }

        a {
          color: var(--color-subtle-light-6);
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
    this.url = 'https://admin.guntherwerks.info';
    this._setHeight = this._setHeight.bind(this);
    window.addEventListener('resize', this._setHeight);
  }

  firstUpdated() {
    this._setHeight();
  }

  _setHeight() {
    const size = this.getBoundingClientRect();
    document.documentElement.style.setProperty('--footer-height', size.height / 16 + 'rem');
  }

  async _getData() {
    const response = await fetch(this.url + '/footer').then(res => res.json()).catch(err => console.error(err));
    return {
      statusCode: 200,
      body: response
    };
  }

  async _getSocialData() {
    const response = await fetch(this.url + '/social').then(res => res.json()).catch(err => console.error(err));
    return {
      statusCode: 200,
      body: response
    };
  }

  async performUpdate() {
    const data = await this._getData(data => {
      this.data = data;
    });
    const socialData = await this._getSocialData(data => {
      this.data = data;
    });
    this.data = data.body;
    this.socialData = socialData.body; // console.log(this.data)
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
          ${this.data.InfoColumnContent.map(i => html`
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

          ${this.socialData.Links.map(i => html`

            <a
              href=${i.URL}
              alt=""
              class="c-footer__social-link"
            >
              <img
                src=${this.url + i.Icon.url}
                alt=${i.Icon.alternativeText}
              >
            </a>
          `)}


        </div>

      </div>

    `;
  }

}