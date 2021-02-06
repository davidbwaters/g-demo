/*
 *  Scripts - Pages - Story
 */
import { css } from '../../../modules/lit-element.js';
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
    this.debug = false;
  }

  firstUpdated() {// console.log(this.data)
  }

  transitionIn() {
    super.transitionIn();
    super.blurAnimation();
  }

  async preload() {
    super.buildComponents();
    await this.imagePreloader([this.data.Content[0].Image.url, this.data.Content[1].Image.url, this.data.Content[2].Image.url, this.data.Content[3].Image.url]);
  }

  render() {
    return [...this.content];
  }

}