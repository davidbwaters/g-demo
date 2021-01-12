/*
 *  Scripts - Components - Angle Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js'; // import animateweb from 'animate.web'

export class FadeTransition extends LitElement {
  static get styles() {
    return css`

      :host {
        background-color: white;
        display: grid;
        height: var(--fade-transition-height);
        padding-bottom: 0rem;
        padding-top: 0rem;
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
        height: 100%;
        width: 100%;
      }

    `;
  }

  static get properties() {
    return {
      data: {
        type: Array,
        attribue: true
      }
    };
  }

  firstUpdated() {
    const length = this.data.length;
    this.innerEl = this.shadowRoot.querySelector('.c-fade-transition__inner');
    this._completePercentage = 100;
    this._framePercentage = this._completePercentage / length;
    this._frameOffset = 0;
    this.url = 'https://admin.guntherwerks.info';
    let count = 1;
    const firstFrame = this.data[0].Frame;
    this.shadowRoot.host.style.setProperty('--fade-transition-height', 100 * firstFrame.height / firstFrame.width + 0 + 'vw');
    this.data.forEach(item => {
      this.shadowRoot.host.style.setProperty('--fade-transition-' + count, 0.1);
      const image = document.createElement('img');
      this['_frameImage' + count] = image;
      image.setAttribute('src', this.url + item.Frame.url);
      image.setAttribute('alt', item.Frame.alternativeText);
      image.style.opacity = 'var(--fade-transition-' + count + ')';
      this.innerEl.appendChild(image);
      count++;
    });

    this._setFrameConfigs();

    this._scrollSetup();

    this._instance.start();

    setTimeout(() => {
      this._instance.calculate();

      this._instance.update();
    }, 500);
  }

  _setFrameConfigs() {
    let count = 1;
    let length = this.data.length;
    this._frameConfigs = [];
    this.data.forEach(item => {
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
    this._instance = basicScroll.create({
      elem: this.innerEl,
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