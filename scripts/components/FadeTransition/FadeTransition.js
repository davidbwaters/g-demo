/*
 *  Scripts - Components - Fade Transition */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js'; // import animateweb from 'animate.web'

import { remote } from '../../config/remote.js';
export class FadeTransition extends LitElement {
  static get styles() {
    return css`

      :host {
        background-color: white;
        box-sizing: content-box !important;
        display: grid;

        padding-bottom: 4rem;
        padding-top: 4rem;
        position: relative;
        width: 100%;
      }

      img {
        height: auto;
        left: 0;
        position: absolute;
        transition: opacity .25s;
        width: 100%;
        will-change: opacity;
      }

      .c-fade-transition__inner {
        display: block;
        height: var(--fade-transition-height);
        width: 100%;
      }

    `;
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribue: true
      }
    };
  }

  constructor() {
    super();
    this.url = remote.url;
  }

  firstUpdated() {
    const length = this.data.Frame.length;
    this.innerEl = this.shadowRoot.querySelector('.c-fade-transition__inner');
    this._completePercentage = 100;
    this._framePercentage = this._completePercentage / length;
    this._frameOffset = 0;
    let count = 1;
    const firstFrame = this.data.Frame[0];
    const height = 100 * firstFrame.height / firstFrame.width + 'vw';
    this.shadowRoot.host.style.setProperty('--fade-transition-height', height);
    this.data.Frame.forEach(item => {
      this.shadowRoot.host.style.setProperty('--fade-transition-' + count, 0.1);
      const image = document.createElement('img');
      this['_frameImage' + count] = image;
      image.setAttribute('src', this.url + item.url);
      image.setAttribute('alt', item.alternativeText);
      image.style.opacity = 'var(--fade-transition-' + count + ')';
      this.innerEl.appendChild(image);
      count++;
    });

    this._setFrameConfigs();

    this._scrollSetup(); // this._scrollInstance.start()


    this.scrollInstances = [this._scrollInstance];
  }

  _setFrameConfigs() {
    let count = 1;
    let length = this.data.Frame.length;
    this._frameConfigs = [];
    this.data.Frame.forEach(item => {
      let start = (count - 1) * this._framePercentage + this._frameOffset;
      let end = count * this._framePercentage + this._frameOffset;

      if (start < 0 || count === 1) {
        start = 0;
      }

      if (end > 100 || count === length) {
        end = 100;
      }

      this._frameConfigs = this._frameConfigs.concat({
        count,
        start,
        end
      });
      count++;
    });
  }

  _scrollSetup() {
    this._scrollInstance = basicScroll.create({
      elem: this,
      from: 'top-bottom',
      to: 'middle-top',
      direct: this,
      inside: (instance, percentage, props) => {
        this._frameConfigs.forEach(frame => {
          if (percentage > frame.start && percentage < frame.end) {
            this.shadowRoot.host.style.setProperty('--fade-transition-' + frame.count, 0.99);
          } else {
            this.shadowRoot.host.style.setProperty('--fade-transition-' + frame.count, 0.1);
          }
        });
      }
    });
  }

  render() {
    return html`
      <div class="c-fade-transition__inner"></div>
    `;
  }

}