/*
 *  Scripts - Components - Heading
 */
import { LitElement, css } from '../../../modules/lit-element.js';
import { initialize } from '../../styles/initialize.js';
export class Heading extends LitElement {
  static get styles() {
    return [initialize, css`
        :host {
          display: block;
        }

        .c-heading__text {
          color: var(--heading-color);
          display: var(--heading-display);
          font-size: calc(var(--heading-size) * .65);
          font-weight: var(--heading-weight);
          letter-spacing: var(--letter-spacing-heading);
          line-height: var(--heading-line-height);
          margin-bottom: .5em;
          margin-top: 0;
          max-width: 60rem;
          text-align: var(--heading-text-align);
        }

        @media (min-width:40em) {

          :host {
            font-size: calc(var(--heading-size) * .75);
          }

        }

        @media (min-width:60em) {

          :host {
            font-size:calc(var(--heading-size) * .85);
          }

        }

        @media (min-width:80em) {

          :host {
            font-size:calc(var(--heading-size) * 1);
          }

        }

        .c-heading__text span {
          color: var(--heading-span-color);
        }
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        reflect: true
      },
      BoldFont: {
        type: Boolean
      },
      Color: {
        type: String
      },
      ColorAlternate: {
        type: Boolean
      },
      Element: {
        type: String
      },
      Size: {
        type: String
      },
      Text: {
        type: String
      },
      TextAlign: {
        type: String
      },
      Weight: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.BoldFont = true;
    this.ColorAlternate = false;
    this.Element = 'h3';
    this.Size = 'Large';
  }

  firstUpdated() {
    this._setData();

    this.headingEl = document.createElement(this.Element);
    this.headingEl.classList.add('c-heading__text');
    this.headingEl.innerHTML = this.Text;
    this.shadowRoot.appendChild(this.headingEl);

    if (this.data && this.data.BoldFont) {
      this.Weight = 'bold';
    } else {
      this.Weight = 'light';
    }

    if (this.ColorAlternate) {
      this.Color = 'alternate';
    }

    this.shadowRoot.host.style.setProperty('--heading-size', 'var(--text-size-heading-' + this.Size.toLowerCase() + ')');
    this.shadowRoot.host.style.setProperty('--heading-line-height', 'var(--line-height-heading-' + this.Size.toLowerCase() + ')');
    this.shadowRoot.host.style.setProperty('--heading-weight', 'var(--font-' + this.Weight.toLowerCase() + 'er-weight)');

    if (!this.Text) {
      this.shadowRoot.host.style.setProperty('--heading-display', 'none');
    } else {
      this.shadowRoot.host.style.setProperty('--heading-display', 'block');
    }

    if (this.Color === 'alternate') {
      this.shadowRoot.host.style.setProperty('--heading-color', 'var(--color-fg-subtle)');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'var(--color-fg)');
    } else if (this.Color === 'inverse') {
      this.shadowRoot.host.style.setProperty('--heading-color', 'var(--color-fg-inverse)');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'var(--color-inverse-contrast)');
    } else if (this.Color === 'inherit') {
      this.shadowRoot.host.style.setProperty('--heading-color', 'inherit');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'inherit');
    } else {
      this.shadowRoot.host.style.setProperty('--heading-color', 'var(--color-fg)');
      this.shadowRoot.host.style.setProperty('--heading-span-color', 'var(--color-fg-subtle)');
    }
  }

  updated() {
    const els = this.shadowRoot.querySelectorAll(this.Element);
    els.forEach(el => {
      el.innerHTML = el.innerHTML.replaceAll('&lt;span&gt;', '<span>').replaceAll('&lt;/span&gt;', '</span>');
      el.innerHTML = el.innerHTML.replaceAll('&lt;strong&gt;', '<strong>').replaceAll('&lt;/strong&gt;', '</strong>');
    });
  }

  _setData() {
    if (this.data) {
      if (this.data.ColorAlternate) {
        this.ColorAlternate = this.data.ColorAlternate;
      }

      if (this.data.Size) {
        this.Size = this.data.Size;
      }

      if (this.data.Text) {
        this.Text = this.data.Text;
      }
    }
  }

}