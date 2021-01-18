/*
 *  Scripts - Components - Scale Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class ScaleSection extends LitElement {
  static get styles() {
    return [initialize, objects, utilities, css`
        :host {
          background-color: var(--scale-section-background-color);
          display: block;
          overflow: hidden;
          position: relative;
          text-align: var(--scale-section-text-align);
          width: 100%;
          will-change: background-size, transform;
        }

        .c-scale-section__inner {
          min-height: 50vh;
        }

        .c-scale-section__background {
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

          .c-scale-section__background {
            height: 100%;
            min-height: none;
            position: absolute;
            top: 0;
          }

        }

        .c-scale-section__image-wrapper {
          justify-self: var(--scale-section-content-justify);
          max-width: 40rem;
        }

        .c-scale-section__image {
          display: block;
          filter: url(/#blur);
          margin-left: auto;
          margin-right: auto;
          transform: scale(var(--scale-section-size));
          transform-origin: var(
            --scale-section-transform-origin-mobile
          );
          will-change: transform;
          width: var(--scale-section-image-width);
        }

        .c-scale-section__content {
          align-content: var(--scale-section-align);
          display: grid;
          justify-content: var(--scale-section-justify);
          padding-left: 10%;
          padding-right: 10%;
          row-gap: .5rem;
        }

        @media (min-width:60em) {

          .c-scale-section__content {
            padding-left: 0;
            padding-right: 0;
          }

        }

        .c-scale-section__content c-heading {
          color: var(--scale-section-heading-color);
          display: var(--scale-section-heading-display);
        }

        .c-scale-section__content c-text-block {
          color: var(--scale-section-text-color);
          display: var(--scale-section-text-display);
        }

        img {
          width: 100%;
          height: auto;
        }

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        reflect: true
      },
      StartPercentage: {
        type: String
      },
      EndPercentage: {
        type: String
      },
      BackgroundColor: {
        type: String
      },
      BackgroundImageMoreOpaque: {
        type: String
      },
      HeadingBoldFont: {
        type: String
      },
      HeadingColor: {
        type: String
      },
      HeadingSize: {
        type: String
      },
      HeadingText: {
        type: String
      },
      Image: {
        type: Object
      },
      ImageAsBackground: {
        type: String
      },
      ImageSpacing: {
        type: Boolean
      },
      Small: {
        type: Boolean
      },
      Text: {
        type: String
      },
      TextAfterImage: {
        type: Boolean
      },
      TextAlign: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
    this.BackgroundColor = 'white';
    this.HeadingSize = 'large';
    this.HeadingBoldFont = true;
    this.ImageSpacing = true;
    this.TextAfterImage = false;
    this.TextDisplay = 'grid';
    this.TextAlign = 'center';
    this.FullSection = {};
  }

  async performUpdate() {
    this.setInitialData();
    super.performUpdate();
  }

  firstUpdated() {
    this._contentEl = this.shadowRoot.querySelector('.c-scale-section__content');
    this._imageEl = this.shadowRoot.querySelector('.c-scale-section__background');

    if (this._isFullSection) {
      this.HeadingBoldFont = true;
      this.HeadingSize = 'medium';
      this.TextAlign = 'left';

      if (this.ImageAsBackground !== 'Disabled') {
        this.shadowRoot.host.style.setProperty('--scale-section-align', this.FullSection.TextY);
        this.shadowRoot.host.style.setProperty('--scale-section-background-position', this.FullSection.ImgX + ' ' + this.FullSection.ImgY);
        this.shadowRoot.host.style.setProperty('--scale-section-justify', this.FullSection.TextX);
      }

      if (!this.ImageSpacing) {
        if (!this.TextAfterImage) {
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', 'center right');
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin-mobile', 'center right');
        } else {
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', 'center left');
          this.shadowRoot.host.style.setProperty('--scale-section-transform-origin-mobile', 'center left');
        }
      } else {
        if (!this.TextAfterImage) {
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
    }

    if (this._isFullSection && this.ImageAsBackground === 'Disabled') {
      this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'end');

      if (!this.TextAfterImage) {
        this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'end');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'start');
      }
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'center');
    }

    if (this.ImageAsBackground === 'OnLightText') {
      this.Color = 'white';
    }

    if (this.ImageAsBackground === 'Disabled') {
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

    this.setSizesRelative();
    this.setBackgroundColor();

    if (this.ImageAsBackground !== 'Disabled') {
      this.setBackgroundImage();
      this.setBackgroundSizes();
      window.addEventListener('resize', () => {
        this.setBackgroundSizes();
      });
    } else {
      this.setImageSizes();
    }

    if (this.BackgroundImageMoreOpaque) {
      this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.4');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.8');
    }

    if (this.ImageAsBackground === 'OnLightText') {
      this.shadowRoot.host.style.setProperty('--scale-section-background-color', 'var(--color-subtle-dark-1)');
      this.shadowRoot.host.style.setProperty('--scale-section-heading-color', 'var(--color-subtle-light-4)');
      this.shadowRoot.host.style.setProperty('--scale-section-text-color', 'var(--color-subtle-light-5)');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-heading-color', 'var(--color-subtle-dark-1)');
      this.shadowRoot.host.style.setProperty('--scale-section-text-color', 'var(--color-subtle-dark-2)');
    }

    if (this.StartPercentage === this.EndPercentage) {
      if (this.ImageAsBackground) {
        this.shadowRoot.host.style.setProperty('var(--scale-section-width)', 'cover');
        this.shadowRoot.host.style.setProperty('var(--scale-section-height)', '');
      }
    }

    this.shadowRoot.host.style.setProperty('--scale-section-text-align', this.TextAlign);

    if (this.HeadingText === undefined) {
      this.shadowRoot.host.style.setProperty('--scale-section-heading-display', 'none');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-heading-display', 'block');
    }

    if (this.Text === undefined) {
      this.shadowRoot.host.style.setProperty('--scale-section-text-display', 'none');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-text-display', 'grid');
    }

    if (this.StartPercentage !== this.EndPercentage) {
      this.scrollSetup();
      setTimeout(() => {
        this._scrollInstance.calculate();

        this._scrollInstance.update();
      }, 500);
    }
  }

  async startScroll() {
    if (!this.firstUpdateComplete) {
      await this.updateComplete;
      this.firstUpdateComplete = true;
    }

    if (this.clientHeight !== 0) {}
  }

  setInitialData() {
    if (this.data) {
      this.id = this.data.id;
      this.Image = this.data.Image;
      this.StartPercentage = this.data.StartPercentage;
      this.EndPercentage = this.data.EndPercentage;

      if (this.data.BackgroundImageMoreOpaque) {
        this.BackgroundImageMoreOpaque = this.data.BackgroundImageMoreOpaque;
      }

      if (this.data.GrayBackground === true) {
        this.BackgroundColor = 'var(--color-subtle-light-5)';
      }

      if (this.data.Heading) {
        this.HeadingText = this.data.Heading;
      }

      if (this.data.HeadingBoldFont) {
        this.HeadingBoldFont = this.data.HeadingBoldFont;
      }

      if (this.data.HeadingSize) {
        this.HeadingSize = this.data.HeadingSize;
      }

      if (this.data.HeadingText) {
        this.HeadingText = this.data.HeadingText;
      }

      if (this.data.ImageBackground) {
        this.ImageBackground = true;
        this._noText = true;
        this.TextDisplay = 'none';

        if (this.data.ImageBackground === false || this.data.ImageBackground === 'false') {
          this.ImageAsBackground = 'Disabled';
        }
      }

      if (this.data.ImageAsBackground) {
        this.ImageAsBackground = this.data.ImageAsBackground;

        if (this.ImageAsBackground === 'OnLightText') {
          this.BackgroundColor = 'var(--color-subtle-dark-1)';
        }
      } else {
        this.ImageAsBackground = 'Disabled';
      }

      if (this.data.Text) {
        this.Text = this.data.Text;
      }

      if (this.data.TextAlign) {
        this.TextAlign = this.data.HeadingTextAlign;
      }

      if (this.data.TextBlockPosition) {
        this._isFullSection = true;

        if (!this.data.Heading) {
          this._noHeading = true;
        }

        let position = this.data.TextBlockPosition;
        let posX = position.PositionHorizontal;
        let posY = position.PositionVertical;

        if (posX === 'Right') {
          this.TextAfterImage = true;
          this.FullSection.TextX = 'end';
        } else if (posX === 'Center') {
          this.FullSection.TextX = 'center';
        } else {
          this.FullSection.TextX = 'start';
        }

        if (posY === 'Middle') {
          this.FullSection.TextY = 'center';
        } else if (posY === 'Bottom') {
          this.FullSection.TextY = 'end';
        } else {
          this.FullSection.TextY = 'start';
        }
      } else {
        this.FullSection.TextX = 'center';
        this.FullSection.TextY = 'center';
      }

      if (this.data.BackgroundPosition) {
        let position = this.data.BackgroundPosition;
        let posX = position.PositionHorizontal;
        let posY = position.PositionVertical;

        if (posX === 'Right') {
          this.TextAfterImage = true;
          this.FullSection.ImgX = 'right';
        } else if (posX === 'Center') {
          this.FullSection.ImgX = 'center';
        } else {
          this.FullSection.ImgX = 'left';
        }

        if (posY === 'Middle') {
          this.FullSection.ImgY = 'center';
        } else if (posY === 'Bottom') {
          this.FullSection.ImgY = 'bottom';
        } else {
          this.FullSection.ImgY = 'top';
        }
      }

      if (this.data.RemoveImageSpacing === true || this.data.RemoveImageSpacing === 'true') {
        this.ImageSpacing = false;
      }
    }
  }

  addHeading() {
    this.headingData = {
      'Text': this.HeadingText,
      'Size': this.HeadingSize,
      'Color': this.Color,
      'BoldFont': this.HeadingBoldFont,
      'TextAlign': this.TextAlign
    };

    this._contentEl.appendChild(this._textBlockEl);
  }

  addTextBlock() {
    if (this._isFullSection) {
      this._textBlockEl = document.createElement('c-text-block');

      this._textBlockEl.classList.add('c-scale-section__text-block');

      this._contentEl.appendChild(this._textBlockEl);
    }
  }

  setSizesRelative() {
    this._biggerSize = Math.max(this.data.StartPercentage, this.EndPercentage);
    this._startIsBigger = this._biggerSize === this.StartPercentage;
    this._smallerSize = this._startIsBigger ? this.EndPercentage : this.StartPercentage;
  }

  setBackgroundColor() {
    this.shadowRoot.host.style.setProperty('--scale-section-background-color', this.BackgroundColor);
  }

  setImageSizes() {
    const sizeRatio = this._smallerSize / this._biggerSize;
    this._startSize = this._startIsBigger ? 1 : 100 * sizeRatio / 100;
    this._endSize = !this._startIsBigger ? 1 : 100 * sizeRatio / 100;
  }

  setBackgroundImage() {
    this._startSize = this.StartPercentage + '%';
    this._endSize = this.EndPercentage + '%';
    this._imageEl.style.backgroundImage = 'url(' + this.url + this.Image.url + ')';
  }

  setBackgroundSizes() {
    if (this.StartPercentage !== this.EndPercentage) {
      this._backgroundEl = this.shadowRoot.querySelector('.c-scale-section__background');
      this._rect = this._backgroundEl.getBoundingClientRect();
      this._elRatio = this._rect.width / this._rect.height;
      this._imageRatio = this.Image.width / this.Image.height;

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

  scrollSetup() {
    this._scrollInstance = basicScroll.create({
      elem: this,
      from: 'top-bottom',
      to: 'bottom-top',
      direct: this,
      props: {
        '--scale-section-size': {
          from: this._startSize,
          to: this._endSize,
          timing: 'sineInOut'
        }
      }
    }); // this._scrollInstance.start()

    this.scrollInstances = [this._scrollInstance];
  }

  render() {
    return html`

      ${this.ImageBackground ? html`
          <div
            class="c-scale-section__background"
          >
          </div>
          ` : this.ImageAsBackground !== 'Disabled' ? html`
            <div
              class="c-scale-section__background"
            >
            </div>
            <div class="
              o-section-block
              c-scale-section__inner
            ">
              <div class="
                o-block
                o-block--half
                c-scale-section__content
              ">

                <div
                  class=""
                >
                  <c-heading
                    text=${this.HeadingText}
                    textAlign="left"
                    size="medium"
                    color="inherit"
                  >
                  </c-heading>
                  <c-text-block
                    content=${JSON.stringify(this.Text)}
                    isFlush="true"
                    backgroundColor="transparent"
                    color="inherit"
                  >
                  </c-text-block>
                </div>
              </div>
            </div>
          ` : this.TextAfterImage && this._isFullSection ? html`
          <div class="
            o-section-block
            c-scale-section__inner
          ">
            <div
              class="
                o-media-block
                o-media-block--split-flush-start
              "
            >
              <div
                class="
                  c-scale-section__image-wrapper
                "
              >
                <img
                  srcset=${this.url + this.Image.formats.medium.url + ', ' + this.url + this.Image.formats.large.url + ' 2x'}
                  src=${this.url + this.Image.formats.large.url}
                  class="
                    c-scale-section__image
                  "
                >
              </div>
              <div
                class="c-scale-section__content"
              >
                <c-heading
                  text=${this.HeadingText}
                  textAlign="left"
                  size="medium"
                  color="inherit"
                >
                </c-heading>
                <c-text-block
                  content=${JSON.stringify(this.Text)}
                  isFlush="true"
                  backgroundColor="transparent"
                  color="inherit"
                >
                </c-text-block>
              </div>
            </div>
          </div>
        ` : !this.TextAfterImage && this._isFullSection ? html`
          <div class="
            o-section-block
            c-scale-section__inner
          ">
            <div
              class="
                o-media-block
                o-media-block--split-flush-end
              "
            >
              <div
                class="c-scale-section__content"
              >
                <c-heading
                  text=${this.HeadingText}
                  textAlign="left"
                  size="medium"
                  color="inherit"
                >
                </c-heading>
                <c-text-block
                  content=${JSON.stringify(this.Text)}
                  backgroundColor="transparent"
                  color="inherit"
                  isFlush="true"
                >
                </c-text-block>
              </div>
              <div
                class="
                  c-scale-section__image-wrapper
                "
              >
                <img
                  srcset=${this.url + this.Image.formats.medium.url + ', ' + this.url + this.Image.formats.large.url + ' 2x'}
                  src=${this.url + this.Image.formats.large.url}
                  class="
                    c-scale-section__image
                  "
                >
              </div>
            </div>
          </div>
        ` : !this._isFullSection ? html`
          <div class="
            o-section-block
            c-scale-section__inner
          ">
            <div
              class="
                o-media-block
              "
            >
              <div
                class="c-scale-section__content"
              >
                <c-heading
                  text=${this.HeadingText}
                  textAlign="left"
                  size="large"
                >
                </c-heading>
                <c-text-block
                  content=${JSON.stringify(this.Text)}
                  isFlush="true"
                  backgroundColor="transparent"
                  color="inherit"
                >
                </c-text-block>
              </div>
              <div
                class="
                  c-scale-section__image-wrapper
                "
              >
                <img
                  srcset=${this.url + this.Image.formats.medium.url + ', ' + this.url + this.Image.formats.large.url + ' 2x'}
                  src=${this.url + this.Image.formats.large.url}
                  class="
                    c-scale-section__image
                  "
                >
              </div>
            </div>
          </div>
        ` : html`
          <div class="
            o-section-block
            c-scale-section__inner
          ">
            <div
              class="
                o-media-block
                o-media-block--split-flush-end
              "
            >
              <div
                class="c-scale-section__content"
              >
                <c-heading
                  text=${this.HeadingText}
                  textAlign="left"
                  size="medium"
                  color="inherit"
                >
                </c-heading>
                <c-text-block
                  content=${JSON.stringify(this.Text)}
                  isFlush="true"
                  backgroundColor="transparent"
                    color="inherit"
                >
                </c-text-block>
              </div>
              <div
                class="
                  c-scale-section__image-wrapper
                "
              >
                <img
                  srcset=${this.url + this.Image.formats.medium.url + ', ' + this.url + this.Image.formats.large.url + ' 2x'}
                  src=${this.url + this.Image.formats.large.url}
                  class="
                    c-scale-section__image
                  "
                >
              </div>
            </div>
          </div>
        `}
    `;
  }

}