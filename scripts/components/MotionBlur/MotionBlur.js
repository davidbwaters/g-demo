/*
 *  Scripts - Components - Motion Blur
 */
import { LitElement, html, css } from '../../../modules/lit-element.js'; //import { motionBlur } from '../../utils/motionBlur'

export class MotionBlur extends LitElement {
  static get styles() {
    return css`
      .c-motion-blur__content {
        filter: url('#blur')
      }

    `;
  }

  static get properties() {
    return {
      ammount: {
        type: Number,
        attribute: true
      }
    };
  }

  constructor() {
    super();
    this.ammount = 0;
    this._content = this.innerHTML;
  }

  firstUpdated() {
    const contentEl = this.shadowRoot.querySelector('.c-motion-blur__content');
    console.log(contentEl);
    contentEl.innerHTML = this._content; // this._addMotion()
  }

  _addMotion(throttle = 400) {
    let even;
    let oldTime;

    const addMotion = time => {
      if (!oldTime) {
        oldTime = time;
      }

      if (time - oldTime > throttle && even === 'true') {
        this.ammount = 4;
        even = 'false';
        oldTime = time;
      }

      if (time - oldTime > throttle && even !== 'true') {
        this.ammount = 5;
        even = 'true';
        oldTime = time;
      }

      requestAnimationFrame(time => {
        addMotion(time);
      });
    };

    requestAnimationFrame(time => {
      addMotion(time);
    });
  }

  render() {
    return html`
      <div class="c-motion-blur__content">

      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        class="filters"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation=${this.ammount + ',0'}
            />
          </filter>
        </defs>
      </svg>
    `;
  }

}