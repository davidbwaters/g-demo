/*
 *  Scripts - Pages - Home
 */
import { Page } from '../../bases/Page.js'; //import {
//  css,
//  html
//} from 'lit-element'

export class HomePage extends Page {
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
    console.log(this.url);
    this.dataEndpoint = '/home';
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
    await this.imagePreloader([this.data.Content[0].Image.URL, this.data.Content[1].UpperBackgroundImage.URL, this.data.Content[1].LowerBackgroundImage.URL]);
  }

  render() {
    return [...this.content];
  }

}