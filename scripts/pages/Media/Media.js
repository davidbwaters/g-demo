/*
 *  Scripts - Pages - Media
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
export class MediaPage extends Page {
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
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.dataEndpoint = '/media-entries';
  }

  firstUpdated() {}

  preload() {
    if (!this.data) {
      setTimeout(() => {
        this.preload();
      }, 500);
    } else {
      this.loaded = true;
    }
  }

  handleLoad() {
    if (this.loaded === true) {
      this.transitionIn();
      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
    } else {
      setTimeout(() => {
        this.handleLoad();
      }, 500);
    }
  }

  transitionIn() {}

  render() {
    return html` <div>
      <h1>Media</h1>
    </div>`;
  }

}