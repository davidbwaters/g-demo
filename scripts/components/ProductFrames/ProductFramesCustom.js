/*
 *  Scripts - Components - Product Frames
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js';
import { lerp, invlerp, clamp } from '../../utils/lerp.js';
export class ProductFrames extends LitElement {
  static get styles() {
    return css`

      :host {
        display: block;
        height: 100%;
        padding-top: var(--navbar-height);
        opacity: var(--scale);
        position: relative;
        width: 100%;
      }

      .c-product-frame__inner {
        height: 100%;
      }

      .c-product-frame__background {
        position: fixed;
        height: 100%;
        overflow: hidden;
        top: 0;
        width: 100%;

      }

      .c-product-frame__background-geometry {
        background-color: var(--product-frame-color);
        height: 300vh;
        position: absolute;
        right: 50%;
        top: -100vh;
        transform:
          rotate(var(--product-frame-angle))
          translateY(0vh)
          translateX(0vw);
        transform-origin: center right;
        transition: background-color var(--transition-duration);
        width: 300vw;
        z-index: 0;
      }

      ::slotted([slot=frame]) {
        display: grid;
        height: 100%;
        position: relative;
        width: 100%;
      }
    `;
  }

  firstUpdated() {
    this._containerEl = this.shadowRoot.querySelector('.c-product-frame__inner');
    this._geometryEl = this.shadowRoot.querySelector('.c-product-frame__background-geometry');
    this._frames = this.querySelectorAll('[slot=frame]');
    this._frameData = [];

    this._getFrameData();

    this._getPositions();

    this._buildConfig();

    this._scrollSetup();

    window.addEventListener('resize', () => {
      this._scrollSetup();
    });
  }

  _getFrameData() {
    let index = 0;

    this._frames.forEach(frame => {
      const step = 100 / (this._frames.length - 1);
      const data = Object.assign({}, frame.dataset);
      const state = (Math.round(step * index * 100) / 100).toString();
      data['state'] = state;
      data['element'] = frame;
      this._frameData = this._frameData.concat(data);
      index++;
    });
  }

  _getPositions() {
    let count = 0;

    this._frames.forEach(frame => {
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = frame.getBoundingClientRect();
      const offset = elemRect.top - bodyRect.top;
      const height = bodyRect.bottom - bodyRect.top;
      this._frameData[count]['position'] = offset;
      this._frameData[count]['height'] = height;
      count++;
    });
  }

  _buildConfig() {
    let count = 0;
    let items = [];

    while (count < this._frames.length - 1) {
      const item = {
        y1: this._frameData[count].position,
        y2: this._frameData[count + 1].position,
        height: this._frameData[count].height,
        props: {
          rotate: {
            name: '--product-frame-angle',
            from: this._frameData[count].rotate,
            to: this._frameData[count + 1].rotate
          },
          color: {
            name: '--product-frame-color',
            from: this._frameData[count].color,
            to: this._frameData[count + 1].color
          }
        }
      };
      items = items.concat(item);
      count++; // console.log(this._frameData)
    }

    this._buildConfigs = items;
  }

  _scrollSetup() {
    this._getPositions();

    const getRange = y => {
      let current;

      this._buildConfigs.forEach(config => {
        if (y > config.y1 && y < config.y2) {
          current = config;
          return;
        }
      });

      if (!current) {
        const item = this._buildConfigs[0];
        const colorValue = 'var(--color-gw-' + item.colorFrom + ')';
        document.documentElement.style.setProperty(item.rotate.name, item.rotateFrom + 'deg');
        document.documentElement.style.setProperty(item.color.name, colorValue);
      }

      return current;
    };

    const scroll = () => {
      let colorValue;
      let rotateValue;
      const item = getRange(window.scrollY);
      console.log(item);
      window.requestAnimationFrame(() => {
        if (item) {
          item.value = invlerp(item.y1 + 400, item.y2, window.scrollY);

          if (item.y2 - window.scrollY < 200) {
            colorValue = 'var(--color-gw-' + item.color.to + ')';
          } else {
            colorValue = 'var(--color-gw-' + item.color.from + ')';
          }

          console.log('wsy ' + window.scrollY);
          console.log('y1 y2 ' + item.y1 + ' ' + item.y2);

          if (window.scrollY < item.y1 + 400) {
            rotateValue = item.rotate.from + 'deg';
          } else {
            rotateValue = lerp(item.rotate.from, item.rotate.to, item.value) + 'deg';
          }

          document.documentElement.style.setProperty(item.rotate.name, rotateValue);
          document.documentElement.style.setProperty(item.color.name, colorValue);
        }
      });
    };

    window.addEventListener('scroll', () => {
      scroll();
      setTimeout(scroll(), 1000);
    });
    scroll();
  }

  render() {
    return html`
      <div class="c-product-frame__inner">
        <slot
          name="frame"
        >
        </slot>
        <div class="c-product-frame__background">
          <div class="c-product-frame__background-geometry">
          </div>
        </div>
      </div>
    `;
  }

}