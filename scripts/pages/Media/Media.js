/*
 *  Scripts - Pages - Media
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
import { heroFrame } from '../../styles/components.hero-frames.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class MediaPage extends Page {
  static get styles() {
    return [initialize, objects, heroFrame, utilities, css`
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
      },
      loadProgress: {
        type: Number,
        reflect: true
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

  transitionIn() {}

  render() {
    return html` <div>
      <h1>Media</h1>
    </div>`;
  }

}