/*
 *  Scripts - Components - Angle Background */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js';
import { getColor } from '../../utils/theme.js';
export class AngleBackground extends LitElement {
  static get styles() {
    return css`

      :host {
        --angle-background-angle: 30deg;

        background-color: white;
        display: block;
        height: 100%;
        position: absolute;
        top: 0px;
        width: 100%;
        z-index: -2;
      }

      .c-angle-background__background {
        display: block;
        height: 100vh;
        overflow: hidden;
        width: 100%;
      }
      .c-angle-background__background-geometry {
        background-color: var(--angle-background-color);
        height: 500vh;
        position: absolute;
        left: 50%;
        opacity: var(--angle-background-opacity);
        pointer-events: none;
        top: -250vh;
        transform:
          rotate(var(--angle-background-angle))
          translateX(var(--angle-background-offset-x))
          translateY(var(--angle-background-offset-y));
        transform-origin: center left;
        transition: background-color var(--transition-duration);
        width: 400vw;
        will-change: transform;
      }

    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      AngleStart: {
        type: String
      },
      ColorStart: {
        type: String
      },
      OffsetXStart: {
        type: String
      },
      OffsetYStart: {
        type: String
      },
      AngleEnd: {
        type: String
      },
      ColorEnd: {
        type: String
      },
      OffsetXEnd: {
        type: String
      },
      OffsetYEnd: {
        type: String
      }
    };
  }

  firstUpdated() {
    this._scrollEl = this;
    this._geometryEl = this.shadowRoot.querySelector('.c-angle-background__background-geometry');

    if (this.data) {
      this.AngleStart = this.data.AngleStart;
      this.AngleEnd = this.data.AngleEnd;
      this.ColorStart = this.data.ColorStart;
      this.ColorEnd = this.data.ColorEnd;
      this.OffsetXStart = this.data.OffsetXStart;
      this.OffsetYStart = this.data.OffsetYStart;
      this.OffsetXEnd = this.data.OffsetXEnd;
      this.OffsetYEnd = this.data.OffsetYEnd;
    }

    this.ColorStart = getColor(this.ColorStart);
    this.ColorEnd = getColor(this.ColorEnd);
    this.shadowRoot.host.style.setProperty('--angle-background-color', this.ColorStart);
    document.documentElement.style.setProperty('--angle-background-angle', this.AngleStart + 'deg');
    document.documentElement.style.setProperty('--angle-background-angle', this.OffsetXStart + 'vw');
    document.documentElement.style.setProperty('--angle-background-angle', this.OffsetYStart + 'vh');

    this._scrollSetup();

    this.getRootNode().host.scrollInstances = [this._scrollInstance];
    this.dispatchEvent(new CustomEvent('scrollReady'));

    this._addObserver();

    this._observer.observe(this);
  }

  _addObserver() {
    let options = {
      root: this,
      rootMargin: '0px',
      threshold: 1.0
    };

    let callback = entry => {
      console.log(entry.target);
      console.log(entry.isIntersecting);

      if (entry.target === this) {
        if (entry.isIntersecting) {
          this.shadowRoot.host.style.setProperty('--footer-z-index', '9');
        } else {
          this.shadowRoot.host.style.setProperty('--footer-z-index', '0');
        }
      }
    };

    this._observer = new IntersectionObserver(callback, options);
  }

  _scrollSetup() {
    this._scrollInstance = basicScroll.create({
      elem: this,
      from: '200px',
      to: '1000px',
      props: {
        '--angle-background-angle': {
          from: this.AngleStart + 'deg',
          to: this.AngleEnd + 'deg'
        },
        '--angle-background-offset-x': {
          from: this.OffsetXStart + 'vw',
          to: this.OffsetXEnd + 'vw'
        },
        '--angle-background-offset-y': {
          from: this.OffsetYStart + 'vh',
          to: this.OffsetYEnd + 'vh'
        },
        '--hero-image-opacity': {
          from: 0.99,
          to: 0.1
        }
      }
    });
  }

  render() {
    return html`
      <div class="c-angle-background__background">
        <div class="c-angle-background__background-geometry">
        </div>
      </div>
    `;
  }

}