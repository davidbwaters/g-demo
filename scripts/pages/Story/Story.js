/*
 *  Scripts - Pages - Story
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
export class StoryPage extends Page {
  static get styles() {
    return [initialize, css`
        :host {
          display: block;
          height: 100%;
          width: 100%;
        }
        section {
          padding-bottom: 4rem;
          padding-top: 4rem;
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
    this.dataEndpoint = '/story';
  }

  firstUpdated() {
    this.handleLoad = this.handleLoad.bind(this);
  }

  preload() {
    if (!this.data) {
      console.log(this.data);
      setTimeout(() => {
        this.preload();
      }, 500);
    } else {
      this.loaded = true;
    }
  }

  handleLoad() {
    console.log('Handle load ...');

    if (this.loaded === true) {
      this.transitionIn();
      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
      console.log('Route loaded ...');
    } else {
      setTimeout(() => {
        this.handleLoad();
      }, 500);
    }
  }

  transitionIn() {}

  render() {
    return html`

    `;
  }

}