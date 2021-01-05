/*
 *  Scripts - Components - Details
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
export class Details extends LitElement {
  static get styles() {
    return css`
      :host {
        align-content: center;
        background-color: var(--color-subtle-light-6);
        column-gap: 4rem;
        display: grid;
        font-size: calc(var(--text-size-normal) * .75);
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        padding-bottom: 4rem;
        padding-top: 4rem;
        row-gap: 4rem;
      }

      @media (min-width:60em) {

        :host {
          font-size: var(--text-size-normal);
        }

      }

      .c-details__item {
        align-items: center;
        border-bottom: solid 0px var(--color-subtle-light-5);
        display: grid;
        row-gap: 1.5rem;
        text-align: center;
      }

      .c-details__item-image {
        background-color: white;
        border: solid 3px var(--color-subtle-light-5);
        border-radius: 10rem;
        margin-left: auto;
        margin-right: auto;
        height: auto;
        width: 8rem;
      }

      @media (min-width:60em) {

        .c-details__item-image {
          width: 10rem;
        }

      }

      p {
        margin-bottom: 0;
        margin-top: 0;
      }
    `;
  }

  static get properties() {
    return {
      data: {
        type: Array
      }
    };
  }

  firstUpdated() {
    this.url = 'https://admin.guntherwerks.info';
    this.data.forEach(item => {
      const wrapperEl = document.createElement('div');
      const imageEl = document.createElement('img');
      const paragraphEl = document.createElement('p');
      wrapperEl.classList.add('c-details__item');
      imageEl.setAttribute('src', this.url + item.Image.url);
      imageEl.setAttribute('alt', item.Image.alternativeText);
      imageEl.classList.add('c-details__item-image');
      paragraphEl.innerHTML = item.Description;
      paragraphEl.classList.add('c-details__item-text');
      wrapperEl.appendChild(imageEl);
      wrapperEl.appendChild(paragraphEl);
      this.shadowRoot.appendChild(wrapperEl);
    });
  }

  render() {
    return html`

    `;
  }

}