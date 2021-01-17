/*
 *  Scripts - Pages - Contact
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
export class ContactPage extends Page {
  static get styles() {
    return [initialize, css`
        :host {
          display: block;
          height: 100%;
          padding-top: var(--navbar-height);
          width: 100%;
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
    return html` <div>
      <h1>Contact</h1>
    </div>`;
  }

}