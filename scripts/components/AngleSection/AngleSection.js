/*
 *  Scripts - Components - Angle Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js'; // import animateweb from 'animate.web'

import { lerp // invlerp,
// clamp
} from '../../utils/lerp.js';
import { getColor } from '../../utils/theme.js';
export class AngleSection extends LitElement {
  static get styles() {
    return css`

      :host {
        position: absolute;
        height: 100%;
        left: 0;
        overflow: hidden;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      .c-angle-section__background-geometry {
        background-color: var(--angle-section-color);
        height: 300vh;
        position: fixed;
        left: 50%;
        top: -100vh;
        transform:
          rotate(var(--angle-section-angle))
          translateX(var(--angle-section-offset-x))
          translateY(var(--angle-section-offset-y));
        transform-origin: center left;
        transition: background-color var(--transition-duration);
        width: 400vw;
        will-change: transform;
        z-index: 0;
      }

    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      startAngle: {
        type: String
      },
      startColor: {
        type: String
      },
      startOffsetX: {
        type: String
      },
      startOffsetY: {
        type: String
      },
      endAngle: {
        type: String
      },
      endColor: {
        type: String
      },
      endOffsetX: {
        type: String
      },
      endOffsetY: {
        type: String
      }
    };
  }

  firstUpdated() {
    this._scrollEl = this.parentElement;
    this._geometryEl = this.shadowRoot.querySelector('.c-angle-section__background-geometry');

    if (this.data) {
      this.startAngle = this.data.StartAngle;
      this.endAngle = this.data.EndAngle;
      this.startColor = this.data.StartColor;
      this.endColor = this.data.EndColor;
      this.startOffsetX = this.data.StartOffsetX;
      this.startOffsetY = this.data.StartOffsetY;
      this.endOffsetX = this.data.EndOffsetX;
      this.endOffsetY = this.data.EndOffsetY;
    }

    this.startColor = getColor(this.startColor);
    this.endColor = getColor(this.endColor);
    this.shadowRoot.host.style.setProperty('--angle-section-color', this.startColor);
    this.shadowRoot.host.style.setProperty('--angle-section-angle', this.startAngle + 'deg');
    this.shadowRoot.host.style.setProperty('--angle-section-angle', this.startOffsetX + 'vw');
    this.shadowRoot.host.style.setProperty('--angle-section-angle', this.startOffsetY + 'vh');

    this._scrollSetup();
  }

  _scrollSetup() {
    this._scrollInstance = basicScroll.create({
      elem: this._scrollEl,
      from: 'top-top',
      to: 'bottom-top',
      direct: this,
      props: {
        '--angle-section-angle': {
          from: this.startAngle + 'deg',
          to: this.endAngle + 'deg'
        },
        '--angle-section-offset-x': {
          from: this.startOffsetX + 'vw',
          to: this.endOffsetX + 'vw'
        },
        '--angle-section-offset-y': {
          from: this.startOffsetY + 'vh',
          to: this.endOffsetY + 'vh'
        }
      },
      inside: (instance, percentage, props) => {
        if (percentage > 50) {
          if (this._isScrolled !== true) {
            this._isScrolled = true;
            this.shadowRoot.host.style.setProperty('--angle-section-color', this.endColor);
          }
        } else {
          if (this._isScrolled !== false) {
            this._isScrolled = false;
            this.shadowRoot.host.style.setProperty('--angle-section-color', this.startColor);
          }
        }

        if (percentage > 80) {
          if (this._isScrolledMore !== true) {
            this._isScrolledMore = true;
            document.documentElement.style.setProperty('--hero-image-opacity', 0.1);
          }
        } else {
          if (this._isScrolledMore !== false) {
            this._isScrolledMore = false;
            document.documentElement.style.setProperty('--hero-image-opacity', 0.99);
          }
        }
      }
    });

    this._scrollInstance.start();
  }

  render() {
    return html`
      <div class="c-angle-section__background-geometry">
      </div>
    `;
  }

}