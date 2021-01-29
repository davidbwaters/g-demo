/*
 *  Scripts - Pages - Story
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class StoryPage extends Page {
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
    this.dataEndpoint = '/story';
    this.debug = true;
  }

  firstUpdated() {}

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