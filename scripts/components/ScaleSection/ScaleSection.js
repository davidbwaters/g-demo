/*
 *  Scripts - Components - Scale Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js'; // import animateweb from 'animate.web'

import { lerp // invlerp,
// clamp
} from '../../utils/lerp.js';
import { motionBlur } from '../../utils/motionBlur.js';
import { getColor } from '../../utils/theme.js';
export class ScaleSection extends LitElement {
  static get styles() {
    return css`

      :host {
        align-content: center;
        background-color: var(--scale-section-bg-color);
        display: grid;
        grid-template-columns: 90%;
        grid-template-rows: 1fr;
        justify-content: center;
        min-height: 90vh;
        overflow: hidden;
        padding-bottom: 6rem;
        padding-top: 6rem;
        position: relative;
        text-align: center;
        width: 100%;
        will-change: background-size, transform;
      }

      :host::before {
        background-image: var(--scale-section-bg-image);
        background-position: center center;
        background-size:
            var(--scale-section-width)
            var(--scale-section-height);
        content: '';
        height: 100%;
        left: 0;
        opacity: .85;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      .c-scale-section__content {
        align-content: center;
        display: grid;
        justify-content: center;
        row-gap: 2rem;
      }

      .c-scale-section__heading {
        margin-left: auto;
        margin-right: auto;
        width: 80%;
      }

      @media (min-width:40em) {
        .c-scale-section__heading {
          margin-left: auto;
          margin-right: auto;
          width: 66%;
        }
      }

      .c-scale-section__image {
        display: block;
        filter: url(/#blur);
        transform: scale(var(--scale-section-size));
        will-change: transform;
      }


      picture {
        margin-left: auto;
        margin-right: auto;
        width: var(--scale-section-image-width);
      }

      img {
        width: 100%;
        height: auto;
      }


    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      startPercentage: {
        type: String
      },
      endPercentage: {
        type: String
      },
      headingSize: {
        type: String
      },
      headingText: {
        type: String
      },
      imageAsBackground: {
        type: String
      },
      image: {
        type: Object
      },
      backgroundColor: {
        type: String
      },
      small: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this._headingData = {
      'Text': ''
    };
  }

  firstUpdated() {
    this._contentEl = this.shadowRoot.querySelector('.c-scale-section__content');

    if (this.data) {
      this.startColor = this.data.StartColor;
      this.endColor = this.data.EndColor;
      this.startPercentage = this.data.StartPercentage;
      this.endPercentage = this.data.EndPercentage;
      this.imageAsBackground = this.data.ImageAsBackground;
      this.image = this.data.Image;
      this.headingText = this.data.HeadingText;
      this.headingSize = this.data.HeadingSize;
    }

    if (this.small === true) {
      this.shadowRoot.host.style.setProperty('--scale-section-image-width', '80%');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-image-width', '100%');
    }

    if (this.backgroundColor === 'gray') {
      this.shadowRoot.host.style.setProperty('--scale-section-bg-color', 'var(--color-subtle-light-5)');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-bg-color', 'white');
    }

    this.url = 'https://admin.guntherwerks.info';
    this._headingData = {
      'Text': this.data.HeadingText,
      'Size': this.data.HeadingSize
    };
    this._headingEl = document.createElement('c-heading');

    this._headingEl.classList.add('c-scale-section__heading');

    this._headingEl.setAttribute('data', JSON.stringify(this._headingData));

    this._contentEl.appendChild(this._headingEl);

    const biggerSize = Math.max(this.startPercentage, this.endPercentage);
    const startIsBigger = biggerSize === this.startPercentage;
    const smallerSize = startIsBigger ? this.endPercentage : this.startPercentage;

    if (this.imageAsBackground === 'Disabled') {
      const sizeRatio = smallerSize / biggerSize;
      this._startSize = startIsBigger ? 1 : 100 * sizeRatio / 100;
      this._endSize = !startIsBigger ? 1 : 100 * sizeRatio / 100;
      this._pictureEl = document.createElement('picture');

      this._pictureEl.classList.add('c-scale-section__image');

      this._contentEl.appendChild(this._pictureEl);

      this._imageEl = document.createElement('img');
      this._source1 = document.createElement('source');
      this._source2 = document.createElement('source');

      this._pictureEl.appendChild(this._source1);

      this._pictureEl.appendChild(this._source2);

      this._pictureEl.appendChild(this._imageEl);

      this._contentEl.appendChild(this._pictureEl);

      this._setAttributes();
    } else {
      this._startSize = this.startPercentage + '%';
      this._endSize = this.endPercentage + '%';
      console.log('ss');

      this._setSizes();

      window.addEventListener('resize', () => {
        this._setSizes();
      });
      this.shadowRoot.host.style.setProperty('--scale-section-bg-image', 'url(' + this.url + this.image.url + ')');

      if (this.imageAsBackground === 'OnLightText') {
        this.shadowRoot.host.style.setProperty('--scale-section-bg-color', 'var(--color-subtle-dark-1)');

        this._headingEl.setAttribute('color', 'white');
      }
    }

    this._scrollSetup();

    setTimeout(() => {
      this._scrollInstance.calculate();

      this._scrollInstance.update();
    }, 500);
  }

  _setAttributes() {
    this._source1.setAttribute('media', '(min-width:700px)');

    this._source1.setAttribute('srcset', this.url + this.image.formats.large.url);

    this._source2.setAttribute('media', '(min-width:0px)');

    this._source2.setAttribute('srcset', this.url + this.image.formats.medium.url);

    this._imageEl.setAttribute('src', this.url + this.image.formats.large.url);

    this._imageEl.setAttribute('alt', this.image.caption);
  }

  _blurAnimation(filter) {
    const blurFilter = document.querySelector('c-router-app').shadowRoot.querySelector('router-outlet').querySelector('c-home-page').shadowRoot.querySelector('#blur').querySelector('feGaussianBlur');
    motionBlur(blurFilter);
  }

  _scrollSetup() {
    this._scrollInstance = basicScroll.create({
      elem: this,
      from: 'top-bottom',
      to: 'middle-top',
      direct: this,
      props: {
        '--scale-section-size': {
          from: this._startSize,
          to: this._endSize,
          timing: 'sineInOut'
        }
      }
    });

    this._scrollInstance.start();
  }

  _setSizes() {
    this._rect = this.getBoundingClientRect();
    this._elRatio = this._rect.width / this._rect.height;
    this._imgRatio = this.data.Image.width / this.data.Image.height;
    console.log(this._imgRatio);

    if (this._elRatio > this._imgRatio) {
      this.shadowRoot.host.style.setProperty('--scale-section-width', 'var(--scale-section-size)');
      this.shadowRoot.host.style.setProperty('--scale-section-height', 'auto');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-width', 'auto');
      this.shadowRoot.host.style.setProperty('--scale-section-height', 'var(--scale-section-size)');
    }
  }

  render() {
    return html`
      <div class="c-scale-section__content">
      </div>
    `;
  }

}