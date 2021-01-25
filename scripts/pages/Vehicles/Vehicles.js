/*
 *  Scripts - Pages - Vehicles
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { motionBlur } from '../../utils/motionBlur.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class VehiclesPage extends Page {
  static get styles() {
    return [initialize, objects, utilities, css`
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      loaded: {
        type: Boolean,
        attribute: false
      },
      loadProgress: {
        type: Number,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.dataEndpoint = '/vehicle';
    this.debug = true;
  }

  firstUpdated() {
    console.log(this.content);
  }

  transitionIn() {
    super.transitionIn();
    super.blurAnimation();
  }

  async preload() {
    super.buildComponents();
    await this.imagePreloader([]);
  }

  render() {
    return [...this.content];
  }

}