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
          rotate(var(--angle-section-angle));
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
        type: Object,
        attribue: true
      },
      startAngle: {
        type: String,
        attribute: true
      },
      startColor: {
        type: String,
        attribute: true
      },
      endAngle: {
        type: String,
        attribute: true
      },
      endColor: {
        type: String,
        attribute: true
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
    }

    this.startColor = getColor(this.startColor);
    this.endColor = getColor(this.endColor);
    document.documentElement.style.setProperty('--angle-section-color', this.startColor);
    document.documentElement.style.setProperty('--angle-section-angle', this.startAngle);

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
        }
      },
      inside: (instance, percentage, props) => {
        if (percentage > 50) {
          if (this._isScrolled !== true) {
            this._isScrolled = true;
            document.documentElement.style.setProperty('--angle-section-color', this.endColor);
          }
        } else {
          if (this._isScrolled !== false) {
            this._isScrolled = false;
            document.documentElement.style.setProperty('--angle-section-color', this.startColor);
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