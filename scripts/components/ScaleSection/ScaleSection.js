/*
 *  Scripts - Components - Scale Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js'; // import animateweb from 'animate.web'

import { motionBlur } from '../../utils/motionBlur.js';
export class ScaleSection extends LitElement {
  static get styles() {
    return css`

      :host {
        align-content: var(--scale-section-align);
        background-color: var(--scale-section-background-color);
        column-gap: 4rem;
        display: grid;
        grid-template-columns: var(
          --scale-section-columns-mobile
        );
        grid-template-rows:  var(
          --scale-section-rows-mobile
        );
        justify-content: var(--scale-section-justify);
        min-height: 90vh;
        overflow: hidden;
        position: relative;
        row-gap:  var(--scale-section-gap-mobile);
        text-align: var(--scale-section-text-align);
        width: 100%;
        will-change: background-size, transform;
      }

      @media (min-width:60em) {

        :host {
          grid-template-columns: var(--scale-section-columns);
          grid-template-rows:  var(--scale-section-rows);
          row-gap: 2rem;
        }

      }

      .c-scale-section-background {
        background-image: var(--scale-section-background-image);
        background-position: var(--scale-section-background-position);
        background-size:
            var(--scale-section-width)
            var(--scale-section-height);
        content: '';
        display: var(--scale-section-background-display);
        left: 0;
        min-height: 40vw;
        opacity: var(--scale-section-background-opacity);
        width: 100%;
        z-index: -1;
      }

      @media (min-width:60em) {

        .c-scale-section-background {
          height: 100%;
          min-height: none;
          position: absolute;
          top: 0;
        }

      }

      .c-scale-section__content {
        align-content: center;
        display: grid;
        grid-template-columns: 80%;
        justify-content: center;
        padding-bottom: var(
          --scale-section-content-spacing-bottom-mobile
        );
        padding-top: var(
          --scale-section-content-spacing-top-mobile
        );
        row-gap: var(--scale-section-content-gap-mobile);
      }

      @media (min-width:60em) {

        .c-scale-section__content {
          justify-content: var(--scale-section-content-justify);
          max-width:  var(--scale-section-content-max);
          padding-bottom: var(
            --scale-section-content-spacing-bottom
          );
          padding-top: var(
            --scale-section-content-spacing-top
          );
          row-gap: var(--scale-section-content-gap);
        }

      }

      .c-scale-section__image-wrapper {
        justify-self: var(--scale-section-content-justify);
        max-width: 40rem;
      }

      @media (min-width:60em) {

        .c-scale-section__image-wrapper {
          align-self: center;
          justify-self: auto;
          max-width: none;
        }

      }

      .c-scale-section__image {
        display: block;
        filter: url(/#blur);
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 3rem;
        padding-top: 3rem;
        transform: scale(var(--scale-section-size));
        transform-origin: var(
          --scale-section-transform-origin-mobile
        );
        will-change: transform;
        width: var(--scale-section-image-width);
      }

      @media (min-width:60em) {

        .c-scale-section__image {
          padding-bottom: 2rem;
          padding-top: 2rem;
          transform-origin: var(
            --scale-section-transform-origin
          );
        }

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
      backgroundColor: {
        type: String
      },
      backgroundImageMoreOpaque: {
        type: String
      },
      headingBoldFont: {
        type: String
      },
      headingColor: {
        type: String
      },
      headingSize: {
        type: String
      },
      headingText: {
        type: String
      },
      image: {
        type: Object
      },
      imageAsBackground: {
        type: String
      },
      imageSpacing: {
        type: Boolean
      },
      small: {
        type: Boolean
      },
      text: {
        type: String
      },
      textAfterImage: {
        type: Boolean
      },
      textAlign: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
    this.headingSize = 'large';
    this.headingBoldFont = true;
    this.imageSpacing = true;
    this.textAfterImage = false;
    this._fullSection = {};
  }

  firstUpdated() {
    this._contentEl = this.shadowRoot.querySelector('.c-scale-section__content');
    this._imageEl = this.shadowRoot.querySelector('.c-scale-section-background');

    this._setInitialData();

    if (this._isFullSection) {
      this.headingBoldFont = true;
      this.headingSize = 'medium';
      this.textAlign = 'left';
      this.shadowRoot.host.style.setProperty('--scale-section-content-gap', '0rem');
      this.shadowRoot.host.style.setProperty('--scale-section-content-max', '40rem');

      if (this.imageAsBackground !== 'Disabled') {
        this.shadowRoot.host.style.setProperty('--scale-section-columns', '50%');
        this.shadowRoot.host.style.setProperty('--scale-section-rows', '90%');
        this.shadowRoot.host.style.setProperty('--scale-section-align', this._fullSection.textY);
        this.shadowRoot.host.style.setProperty('--scale-section-background-position', this._fullSection.imgX + ' ' + this._fullSection.imgY);
        this.shadowRoot.host.style.setProperty('--scale-section-justify', this._fullSection.textX);
        this.shadowRoot.host.style.setProperty('--scale-section-rows-mobile', '1fr 1fr');
        this.shadowRoot.host.style.setProperty('--scale-section-content-gap-mobile', '0');
        this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-top', '4rem');
        this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-bottom', '4rem');
        this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-top-mobile', '3rem');
        this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-bottom-mobile', '3rem');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-background-position', 'center center');
        this.shadowRoot.host.style.setProperty('--scale-section-columns', '50% 50%');

        if (!this.textAfterImage) {
          this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-top-mobile', '4rem');
        } else {
          this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-bottom-mobile', '4rem');
        }
      }

      if (!this.imageSpacing) {
        this.shadowRoot.host.style.setProperty('--scale-section-image-width', '100%');

        if (!this.textAfterImage) {
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', 'center right');
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin-mobile', 'center right');
        } else {
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', 'center left');
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin-mobile', 'center left');
        }
      } else {
        if (!this.textAfterImage) {
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', 'center left');
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin-mobile', 'center center');
        } else {
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', 'center right');
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin-mobile', 'center center');
        }
      }
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-content-max', 'none');
      this.shadowRoot.host.style.setProperty('--scale-section-background-position', 'center center');

      if (this.small === true) {
        this.shadowRoot.host.style.setProperty('--scale-section-image-width', '70%');
      }

      this.shadowRoot.host.style.setProperty('--scale-section-content-gap', '2rem');
      this.shadowRoot.host.style.setProperty('--scale-section-columns', '80%');
    }

    if (this._isFullSection && this.imageAsBackground === 'Disabled') {
      this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'end');

      if (!this.textAfterImage) {
        this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'end');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'start');
      }
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'center');
    }

    if (this.imageAsBackground === 'OnLightText') {
      this.color = 'white';

      if (this.backgroundImageMoreOpaque) {
        this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.4');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.8');
      }
    } else {
      if (this.backgroundImageMoreOpaque) {
        this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.6');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.9');
      }

      this.color = 'dark';
    }

    if (this.imageAsBackground === 'Disabled') {
      this.shadowRoot.host.style.setProperty('--scale-section-background-display', 'none');
      this.shadowRoot.host.style.setProperty('--scale-section-align', 'center');
      this.shadowRoot.host.style.setProperty('--scale-section-justify', 'center');
      this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-top-mobile', '4rem');
      this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-bottom-mobile', '4rem');
      this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-top', '6rem');
      this.shadowRoot.host.style.setProperty('--scale-section-content-spacing-bottom', '6rem');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-background-display', 'block');
    }

    this._setSizesRelative();

    this._setBackgroundColor();

    if (this._noText !== true) {
      this._addHeading();

      this._addTextBlock();
    }

    if (this.imageAsBackground !== 'Disabled') {
      this._setBackgroundImage();

      window.addEventListener('resize', () => {
        this._setBackgroundSizes();
      });
    } else {
      this._setImage();

      if (this.textAfterImage) {
        this.shadowRoot.insertBefore(this._pictureWrapperEl, this._contentEl);
      } else {
        this.shadowRoot.appendChild(this._pictureWrapperEl);
      }
    }

    if (!this._noText) {
      this._contentEl.appendChild(this._headingEl);

      if (this._isFullSection) {
        this._contentEl.appendChild(this._textBlockEl);
      }
    }

    if (this.startPercentage !== this.endPercentage) {
      this._scrollSetup();

      setTimeout(() => {
        this._scrollInstance.calculate();

        this._scrollInstance.update();
      }, 500);
    } else {
      if (this.imageAsBackground) {
        this.shadowRoot.host.style.setProperty('var(--scale-section-width)', 'cover');
        this.shadowRoot.host.style.setProperty('var(--scale-section-height)', '');
      }
    }

    if (this._noText) {
      this._contentEl.style.display = 'none';
    }
  }

  _setInitialData() {
    if (this.data) {
      this.image = this.data.Image;
      this.startPercentage = this.data.StartPercentage;
      this.endPercentage = this.data.EndPercentage;

      if (this.data.BackgroundImageMoreOpaque) {
        this.backgroundImageMoreOpaque = true;
      }

      if (this.data.GrayBackground === true) {
        this.backgroundColor = 'gray';
      }

      if (this.data.Heading) {
        this.headingText = this.data.Heading;
      }

      if (this.data.HeadingBoldFont) {
        this.headingBoldFont = this.data.HeadingBoldFont;
      }

      if (this.data.HeadingSize) {
        this.headingSize = this.data.HeadingSize;
      }

      if (this.data.HeadingText) {
        this.headingText = this.data.HeadingText;
      }

      if (this.data.ImageBackground) {
        this._noText = true;

        if (this.data.ImageBackground === false || this.data.ImageBackground === 'false') {
          this.imageAsBackground = 'Disabled';
        }
      }

      if (this.data.ImageAsBackground) {
        this.imageAsBackground = this.data.ImageAsBackground;
      } else {
        this.imageAsBackground = 'Disabled';
      }

      if (this.data.Text) {
        this.text = this.data.Text;
      }

      if (this.data.TextAlign) {
        this.textAlign = this.data.HeadingTextAlign;
      }

      if (this.data.TextBlockPosition) {
        this._isFullSection = true;

        if (!this.data.Heading) {
          this._noText = true;
        }

        let position = this.data.TextBlockPosition;
        let posX = position.PositionHorizontal;
        let posY = position.PositionVertical;

        if (posX === 'Right') {
          this.textAfterImage = true;
          this._fullSection.textX = 'end';
        } else if (posX === 'Center') {
          this._fullSection.textX = 'center';
        } else {
          this._fullSection.textX = 'start';
        }

        if (posY === 'Middle') {
          this._fullSection.textY = 'center';
        } else if (posY === 'Bottom') {
          this._fullSection.textY = 'end';
        } else {
          this._fullSection.textY = 'start';
        }
      }

      if (this.data.BackgroundPosition) {
        let position = this.data.BackgroundPosition;
        let posX = position.PositionHorizontal;
        let posY = position.PositionVertical;

        if (posX === 'Right') {
          this.textAfterImage = true;
          this._fullSection.imgX = 'right';
        } else if (posX === 'Center') {
          this._fullSection.imgX = 'center';
        } else {
          this._fullSection.imgX = 'left';
        }

        if (posY === 'Middle') {
          this._fullSection.imgY = 'center';
        } else if (posY === 'Bottom') {
          this._fullSection.imgY = 'bottom';
        } else {
          this._fullSection.imgY = 'top';
        }
      }

      if (this.data.RemoveImageSpacing === true || this.data.RemoveImageSpacing === 'true') {
        this.imageSpacing = false;
      }
    }
  }

  _addHeading() {
    this._headingData = {
      'Text': this.headingText,
      'Size': this.headingSize,
      'Color': this.color,
      'BoldFont': this.headingBoldFont,
      'TextAlign': this.textAlign
    };
    this._headingEl = document.createElement('c-heading');

    this._headingEl.classList.add('c-scale-section__heading');

    this._headingEl.setAttribute('data', JSON.stringify(this._headingData));

    this._contentEl.appendChild(this._headingEl);
  }

  _addTextBlock() {
    if (this._isFullSection) {
      this._textBlockEl = document.createElement('c-text-block');

      this._textBlockEl.classList.add('c-scale-section__text-block');

      this._textBlockEl.content = this.text;
      this._textBlockEl.color = this.color;
      this._textBlockEl.isBold = false;
      this._textBlockEl.isFlush = true;
      this._textBlockEl.textAlign = this.textAlign;
      this._textBlockEl.backgroundColor = 'transparent';

      this._contentEl.appendChild(this._textBlockEl);
    }
  }

  _setSizesRelative() {
    this._biggerSize = Math.max(this.startPercentage, this.endPercentage);
    this._startIsBigger = this._biggerSize === this.startPercentage;
    this._smallerSize = this._startIsBigger ? this.endPercentage : this.startPercentage;
  }

  _setBackgroundColor() {
    if (this.backgroundColor === 'gray') {
      this.shadowRoot.host.style.setProperty('--scale-section-background-color', 'var(--color-subtle-light-5)');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-background-color', 'white');
    }
  }

  _setImage() {
    const sizeRatio = this._smallerSize / this._biggerSize;
    this._startSize = this._startIsBigger ? 1 : 100 * sizeRatio / 100;
    this._endSize = !this._startIsBigger ? 1 : 100 * sizeRatio / 100;
    this._pictureEl = document.createElement('picture');

    this._pictureEl.classList.add('c-scale-section__image');

    this._imageEl = document.createElement('img');
    this._source1 = document.createElement('source');
    this._source2 = document.createElement('source');

    this._pictureEl.appendChild(this._source1);

    this._pictureEl.appendChild(this._source2);

    this._pictureEl.appendChild(this._imageEl);

    this._pictureWrapperEl = document.createElement('div');

    this._pictureWrapperEl.classList.add('c-scale-section__image-wrapper');

    this._pictureWrapperEl.appendChild(this._pictureEl);

    this._setImageAttributes();
  }

  _setImageAttributes() {
    this._source1.setAttribute('media', '(min-width:700px)');

    this._source1.setAttribute('srcset', this.url + this.image.formats.large.url);

    this._source2.setAttribute('media', '(min-width:0px)');

    this._source2.setAttribute('srcset', this.url + this.image.formats.medium.url);

    this._imageEl.setAttribute('src', this.url + this.image.formats.large.url);

    this._imageEl.setAttribute('alt', this.image.alternativeText);
  }

  _setBackgroundImage() {
    this._startSize = this.startPercentage + '%';
    this._endSize = this.endPercentage + '%';

    this._setBackgroundSizes();

    this._imageEl.style.backgroundImage = 'url(' + this.url + this.image.url + ')';

    if (this.imageAsBackground === 'OnLightText') {
      this.shadowRoot.host.style.setProperty('--scale-section-background-color', 'var(--color-subtle-dark-1)');
    }
  }

  _setBackgroundSizes() {
    if (this.startPercentage !== this.endPercentage) {
      this._backgroundEl = this.shadowRoot.querySelector('.c-scale-section-background');
      this._rect = this._backgroundEl.getBoundingClientRect();
      this._elRatio = this._rect.width / this._rect.height;
      this._imageRatio = this.data.Image.width / this.data.Image.height;

      if (this._elRatio > this._imageRatio) {
        this.shadowRoot.host.style.setProperty('--scale-section-width', 'var(--scale-section-size)');
        this.shadowRoot.host.style.setProperty('--scale-section-height', 'auto');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-width', 'auto');
        this.shadowRoot.host.style.setProperty('--scale-section-height', 'var(--scale-section-size)');
      }
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-width', 'cover');
      this.shadowRoot.host.style.setProperty('--scale-section-height', ' ');
    }
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

  render() {
    return html`
      <div
        class="c-scale-section-background"
      >
      </div>
      <div
        class="c-scale-section__content"
      >
      </div>
    `;
  }

}