/*
 *  Scripts - Components - Product Frames
 */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js'; // import animateweb from 'animate.web'

import { lerp // invlerp,
// clamp
} from '../../utils/lerp.js';
import { motionBlur } from '../../utils/motionBlur.js';
export class ProductFrames extends LitElement {
  static get styles() {
    return css`

      :host {
        display: block;
        height: 100%;
        opacity: var(--scale);
        position: relative;
        width: 100%;
      }

      .c-product-frame__inner {
        height: 100%;
      }

      .c-product-frame__background {
        position: fixed;
        height: 100vh;
        overflow: hidden;
        top: 0;
        width: 100%;
        z-index: 0;
      }

      .c-product-frame__background-geometry {
        background-color: var(--product-frame-color);
        height: 300vh;
        position: absolute;
        right: 50%;
        top: -100vh;
        transform:
          rotate(var(--product-frame-angle))
          translateY(var(--product-frame-translate-y))
          translateX(var(--product-frame-translate-x));
        transform-origin: center right;
        transition: background-color var(--transition-duration);
        width: 400vw;
        will-change: transform;
        z-index: 0;
      }

      ::slotted([slot=frame]) {
        align-content: center;
        display: grid;
        filter: url('#blur');
        margin: auto;
        max-width: 1080x;
        min-height: 100%;
        padding-top: calc(var(--navbar-height) + 2rem);
        padding-bottom: calc(var(--navbar-height + 2rem));
        position: relative;
        width: 80%;
        z-index: 1;
      }

    `;
  }

  firstUpdated() {
    const shadowSyles = this.shadowRoot.adoptedStyleSheets;
    const docStyles = document.adoptedStyleSheets;
    console.log(docStyles);
    this._containerEl = this.shadowRoot.querySelector('.c-product-frame__inner');
    this._geometryEl = this.shadowRoot.querySelector('.c-product-frame__background-geometry');
    this._frames = this.querySelectorAll('[slot=frame]');
    this._frameData = [];
    this._frameConfigs = [];
    this._scrollInstances = {};

    this._getFrameData();

    this._buildConfig();

    this._scrollSetup();

    this._blurAnimation();
  }

  _getFrameData() {
    this._frames.forEach(frame => {
      const data = Object.assign({}, frame.dataset);
      data['element'] = frame;
      data['productElement'] = frame.querySelector('img');
      this._frameData = this._frameData.concat(data);
    });
  }

  _buildConfig() {
    let count = 0;
    let items = [];

    while (count < this._frames.length - 1) {
      const item = {
        el: this._frameData[count].element,
        productEl: this._frameData[count].productElement,
        index: count,
        props: [{
          name: '--product-frame-angle',
          from: this._frameData[count].rotate,
          to: this._frameData[count + 1].rotate,
          suffix: 'deg',
          type: 'number'
        }, {
          name: '--product-frame-color',
          prefix: 'var(--color-gw-',
          suffix: ')',
          from: this._frameData[count].color,
          to: this._frameData[count + 1].color,
          type: 'string'
        }, {
          name: '--product-frame-translate-y',
          from: this._frameData[count].translateY,
          to: this._frameData[count + 1].translateY,
          suffix: 'vh',
          type: 'number'
        }, {
          name: '--product-frame-translate-x',
          from: this._frameData[count].translateX,
          to: this._frameData[count + 1].translateX,
          suffix: 'vw',
          type: 'number'
        }],
        animateIn: this._frameData[count].productAnimateIn,
        animateOut: this._frameData[count].productAnimateOut,
        animateNextIn: this._frameData[count + 1].productAnimateIn,
        animateNextOut: this._frameData[count + 1].productAnimateOut
      };
      console.log(item);
      items = items.concat(item);
      count++;
    }

    this._frameConfigs = items;
  }

  _setAnimations(config, percentage, limitOut, nextIn) {
    if (this['_animatedOut' + (config.index + 1)] !== 'true' && percentage > limitOut) {
      this['_animatedOut' + (config.index + 1)] = 'true';
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--product-frame-animation-' + (config.index + 1), config.animateOut);
      });
    }

    if (this['_animatedOut' + (config.index + 1)] === 'true' && percentage < limitOut) {
      this['_animatedOut' + (config.index + 1)] = 'false';
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--product-frame-animation-' + (config.index + 1), config.animateIn);
      });
    }

    if (this['_animatedNextIn' + (config.index + 1)] !== 'true' && percentage > nextIn) {
      this['_animatedNextIn' + (config.index + 1)] = 'true';
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--product-frame-animation-' + (config.index + 2), config.animateNextIn);
      });
    }

    if (this['_animatedNextIn' + (config.index + 1)] === 'true' && percentage < nextIn) {
      this['_animatedNextIn' + (config.index + 1)] = 'false';
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--product-frame-animation-' + (config.index + 2), config.animateNextOut);
      });
    }
  }

  _setProperties(props, percentage, offset) {
    const wrapValue = (value, prefix, suffix) => {
      let newValue = value;

      if (prefix) {
        newValue = prefix + newValue;
      }

      if (suffix) {
        newValue += suffix;
      }

      return newValue;
    };

    props.forEach(prop => {
      let name = prop.name;

      if (percentage > offset) {
        if (prop.type === 'number') {
          let value = lerp(prop.from, prop.to, percentage / 100);
          console.log(percentage + '%');
          value = wrapValue(value, prop.prefix, prop.suffix);
          document.documentElement.style.setProperty(name, value);
        } else {
          document.documentElement.style.setProperty(name, wrapValue(prop.to, prop.prefix, prop.suffix));
        }
      } else {
        document.documentElement.style.setProperty(name, wrapValue(prop.from, prop.prefix, prop.suffix));
      }
    });
  }

  _blurAnimation(filter) {
    const blurFilter = document.querySelector('router-app').shadowRoot.querySelector('router-outlet').querySelector('home-page').shadowRoot.querySelector('#blur').querySelector('feGaussianBlur');
    motionBlur(blurFilter);
  }

  _setInitial() {
    this._setProperties(this._frameConfigs[0].props, 60, 80);

    this._frameData[this._frameData.length - 1].productElement.style.animation = 'var(--product-frame-animation-' + this._frameData.length + ') 1s forwards';

    this._frameConfigs.forEach(config => {
      window.requestAnimationFrame(() => {
        config.productEl.style.animation = 'var(--product-frame-animation-' + (config.index + 1) + ') 1s forwards';
      });

      if (config.index === 0) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--product-frame-animation-' + (config.index + 1), config.animateIn);
        });
      } else {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--product-frame-animation-' + (config.index + 1), config.animateOut);
        });
      }
    });
  }

  _scrollSetup() {
    let scrollCount = 1;

    this._setInitial();

    this._frameConfigs.forEach(config => {
      this._scrollInstances['scroll-' + scrollCount] = basicScroll.create({
        elem: config.el,
        from: 'top-top',
        to: 'bottom-top',
        inside: (instance, percentage, props) => {
          window.requestAnimationFrame(() => {
            this._setProperties(config.props, percentage, 50);

            this._setAnimations(config, percentage, 60, 80);
          });
        }
      });

      this._scrollInstances['scroll-' + scrollCount].start();

      console.log(this._scrollInstances['scroll-' + scrollCount].getData());
      console.log(this._scrollInstances['scroll-' + scrollCount].calculate());
      scrollCount++;
    });
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