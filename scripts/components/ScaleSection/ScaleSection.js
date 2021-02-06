/*
 *  Scripts - Components - Scale Section */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
import { remote } from '../../config/remote.js';
export class ScaleSection extends LitElement {
  static get styles() {
    return [initialize, objects, utilities, css`

        :host {
          background-color: var(--scale-section-background);
          color: var(--scale-section-color);
          display: grid;
          overflow: hidden;
          position: relative;
          width: 100%;
          will-change: background-size, transform;
        }

        @media(min-width: 70em) {

          :host {
            min-height: var(--scale-section-min-height);
          }

        }

        .c-scale-section__content {
          align-content: var(--scale-section-content-align);
          display:  grid;
          justify-content: var(--scale-section-content-justify);
          row-gap: 0;
          width: 100%;
        }

        @media(max-width: 70em) {

          .c-scale-section__content {
            justify-content: center;
          }

        }

        .c-scale-section__heading {
          color: var(--scale-section-color);
          display:  var(--scale-section-heading-display);
          text-align: var(--scale-section-content-text-align);
        }

        .c-scale-section__text {
          color: var(--scale-section-color);
          display:  var(--scale-section-text-display);
          text-align: var(--scale-section-content-text-align);
        }

        .c-scale-section__image {
          align-self: var(--scale-section-image-align);
          display: block;
          justify-self: var(--scale-section-image-justify);
          padding-bottom: var(--scale-section-image-spacing-left);
          padding-left: var(--scale-section-image-spacing-left);
          padding-right: var(--scale-section-image-spacing-right);
          padding-top: var(--scale-section-image-spacing-left);
          transform: scale(var(--scale-section-size));
          transform-origin: var(
            --scale-section-transform-origin
          );
          will-change: transform;
        }


        @media(max-width:40rem) {

          .c-scale-section__image {
            padding-left:
              var(
                --scale-section-image-padding-left
              );
            padding-right:
              var(
                --scale-section-image-padding-right
              );
          }

        }

        .c-scale-section__background {
          background-attachment: var(--scale-section-background-attachment);
          background-image: var(--scale-section-background-image);
          background-position: var(--scale-section-background-position);
          background-size: auto 75vw;
          bottom: 0;
          content: '';
          display: var(--scale-section-background-display);
          left: 0;
          min-height: 75vw;
          opacity: var(--scale-section-background-opacity);
          position: absolute;
          right: 0;
          top: 0;
          transform: scale(var(--scale-section-size));
          transform-origin: var(
            --scale-section-transform-origin
          );
          width: 100%;
          will-change: transform;
          z-index: -1;
        }

        @media(max-width: 70em) {

          .c-scale-section__background {
            background-size: cover;
            position: static;
          }

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
      BackgroundOpacity: {
        type: Number
      },
      Component: {
        type: String
      },
      HasHeading: {
        type: Boolean
      },
      HasText: {
        type: Boolean
      },
      Image: {
        type: Object
      },
      ImageSpacing: {
        type: Boolean
      },
      Text: {
        type: Array
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
    this.url = remote.url;
    this.ContentPosition = {};
    this.BackgroundPosition = {};
    this.ContentPosition.PositionHorizontal = 'left';
    this.ContentPosition.PositionVertical = 'center';
    this.BackgroundPosition.PositionHorizontal = 'center';
    this.BackgroundPosition.PositionVertical = 'center';
    this.HasHeading = false;
    this.HasText = false;
  }

  firstUpdated() {
    if (this.data.ContentPosition) {
      this.ContentPosition = this.data.ContentPosition;
    }

    if (this.data.BackgroundPosition) {
      this.BackgroundPosition = this.data.BackgroundPosition;
    }

    if (this.data.Text.length) {
      this.HasText = true;
    }

    if (this.data.Heading) {
      this.HasHeading = true;
    }

    this.setStyleProperties();
    this.setPositions();

    if (this.data.ScaleTransition && this.data.ScaleTransition.Start !== this.data.ScaleTransition.End) {
      this.StartPercentage = this.data.ScaleTransition.Start;
      this.EndPercentage = this.data.ScaleTransition.End;
      this.isActive = this.getRootNode().host.hasAttribute('active');
      this.setSizes();
      this.scrollSetup();

      this._scrollInstance.start();

      if (this.isActive) {
        this._scrollInstance.start();
      }
    }

    const imageFirst = this.data.Layout === 'ImageLeft';
    const imageLast = this.data.Layout === 'ImageRight';

    if (imageFirst && !this.data.ImageSpacing) {
      this.shadowRoot.host.style.setProperty('--scale-section-image-padding-left', '0');
      this.shadowRoot.host.style.setProperty('--scale-section-image-padding-right', '15%');
    } else if (imageLast && !this.data.ImageSpacing) {
      this.shadowRoot.host.style.setProperty('--scale-section-image-padding-left', '15%');
      this.shadowRoot.host.style.setProperty('--scale-section-image-padding-right', '0');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-padding-left', '15%');
      this.shadowRoot.host.style.setProperty('--scale-section-padding-right', '15%');
    }

    if (this.Component === 'article') {
      this.shadowRoot.host.style.setProperty('--scale-section-min-height', 'none');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-min-height', '90vh');
    }
  }

  setPositions() {
    const imgX = this.BackgroundPosition.PositionHorizontal;
    const imgY = this.BackgroundPosition.PositionVertical;
    const txtX = this.ContentPosition.PositionHorizontal;
    const txtY = this.ContentPosition.PositionVertical;

    if (imgX.toLowerCase() === 'left') {
      this.shadowRoot.host.style.setProperty('--scale-section-image-justify', 'start');
    } else if (imgX.toLowerCase() === 'center') {
      this.shadowRoot.host.style.setProperty('--scale-section-image-justify', 'center');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-image-justify', 'end');
    }

    if (imgY.toLowerCase() === 'top') {
      this.shadowRoot.host.style.setProperty('--scale-section-image-align', 'start');
    } else if (imgY.toLowerCase() === 'center') {
      this.shadowRoot.host.style.setProperty('--scale-section-image-align', 'center');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-image-align', 'end');
    }

    this.shadowRoot.host.style.setProperty('--scale-section-background-position', imgX.toLowerCase() + ' ' + imgY.toLowerCase());
    this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', imgX.toLowerCase() + ' ' + imgY.toLowerCase());

    if (this.data.TextAlign) {
      this.shadowRoot.host.style.setProperty('--scale-section-content-text-align', this.data.TextAlign.toLowerCase());
    }

    if (txtX.toLowerCase() === 'left') {
      this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'start');
    } else if (txtX.toLowerCase() === 'center') {
      this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'center');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'end');
    }

    if (this.data.Layout === 'Centered' || this.data.Layout === 'CenteredImageFirst') {
      this.shadowRoot.host.style.setProperty('--scale-section-content-justify', 'center');
    }

    if (txtY.toLowerCase() === 'bottom') {
      this.shadowRoot.host.style.setProperty('--scale-section-content-align', 'end');
    } else if (txtY.toLowerCase() === 'center') {
      this.shadowRoot.host.style.setProperty('--scale-section-content-align', 'center');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-content-align', 'start');
    }

    if (this.data.Layout === 'ImageRight') {
      this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', 'center right');
    }

    if (this.data.Layout === 'ImageLeft') {
      this.shadowRoot.host.style.setProperty('--scale-section-transform-origin', 'center left');
    }

    if (this.Component === 'background' && this.data.Heading === null && !this.data.Text.length) {
      this.shadowRoot.querySelector('.o-section-block').style.display = 'none';
    }
  }

  setStyleProperties() {
    if (this.HasHeading) {
      this.shadowRoot.host.style.setProperty('--scale-section-heading-display', 'block');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-heading-display', 'none');
    }

    if (this.HasText) {
      this.shadowRoot.host.style.setProperty('--scale-section-text-display', 'grid');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-text-display', 'none');
    }

    if (this.data.TextSize) {
      this.shadowRoot.host.style.setProperty('--scale-section-background', 'var(--text-size-' + this.data.TextSize.toLowerCase() + ')');
    }

    if (this.data.TextBoldFont === false) {
      this.shadowRoot.host.style.setProperty('--scale-section-background', 'var(--color-bg-subtle)');
    }

    if (this.Component === 'image' || this.Component === 'article') {
      if (this.data.GrayBackground) {
        this.shadowRoot.host.style.setProperty('--scale-section-background', 'var(--color-bg-subtle)');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-background', 'var(--color-bg)');
      }

      if (!this.Component === 'article') {
        this.shadowRoot.host.style.setProperty('--scale-section-color', 'var(--color-fg)');
      }
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-color', 'initial');
    }

    if (this.Component === 'image') {
      if (this.data.ImageSpacing && this.data.Layout === 'ImageRight') {
        this.shadowRoot.host.style.setProperty('--scale-section-image-spacing-right', '0rem');
        this.shadowRoot.host.style.setProperty('--scale-section-image-spacing-left', '0');
      } else if (this.data.ImageSpacing && this.data.Layout === 'ImageLeft') {
        this.shadowRoot.host.style.setProperty('--scale-section-image-spacing-left', '0rem');
        this.shadowRoot.host.style.setProperty('--scale-section-image-spacing-right', '0');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-image-spacing-right', '0rem');
        this.shadowRoot.host.style.setProperty('--scale-section-image-spacing-left', '0rem');
      }
    }

    if (this.Component === 'background') {
      this.shadowRoot.host.style.setProperty('--scale-section-background-image', 'url(' + this.url + this.data.BackgroundImage.url + ')');
      this.shadowRoot.host.style.setProperty('--scale-section-background-display', 'grid');

      if (this.data.TextAlign) {
        this.shadowRoot.host.style.setProperty('--scale-section-text-align', this.data.TextAlign.toLowerCase());
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-text-align', 'left');
      }

      if (this.data.BackgroundFixed) {
        this.shadowRoot.host.style.setProperty('--scale-section-background-attachment', 'fixed');
      } else {
        this.shadowRoot.host.style.setProperty('--scale-section-background-attachment', 'initial');
      }

      if (this.data.Opaque) {
        this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.5');
      } else {
        if (this.data.ContentLight) {
          this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.8');
        } else {
          this.shadowRoot.host.style.setProperty('--scale-section-background-opacity', '.9');
        }
      }
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-background-display', 'none');
    }

    if (this.data.ContentLight) {
      this.shadowRoot.host.style.setProperty('--scale-section-background', 'var(--color-bg-inverse-contrast)');
      this.shadowRoot.host.style.setProperty('--scale-section-color', 'var(--color-fg-inverse-contrast)');
    } else if (this.Component === 'background') {
      this.shadowRoot.host.style.setProperty('--scale-section-background', 'var(--color-bg-contrast)');
      this.shadowRoot.host.style.setProperty('--scale-section-color', 'var(--color-fg-contrast)');
    } else {
      this.shadowRoot.host.style.setProperty('--scale-section-color', 'var(--color-fg-subtle)');
    }

    if (this.data.CustomColors) {
      this.shadowRoot.host.style.setProperty('--scale-section-background', this.data.CustomColors.BackgroundColor);
      this.shadowRoot.host.style.setProperty('--scale-section-color', this.data.CustomColors.TextColor);
    }
  }

  setSizes() {
    this._biggerSize = Math.max(this.StartPercentage, this.EndPercentage);
    this._startIsBigger = this._biggerSize === this.StartPercentage;
    this._smallerSize = this._startIsBigger ? this.EndPercentage : this.StartPercentage;

    if (this.data.BackgroundImage) {
      this._sizeRatio = this._biggerSize / this._smallerSize;
      this._startSize = !this._startIsBigger ? 1 : this._sizeRatio;
      this._endSize = this._startIsBigger ? 1 : this._sizeRatio;
    } else {
      this._sizeRatio = this._smallerSize / this._biggerSize;
      this._startSize = this._startIsBigger ? 1 : this._sizeRatio;
      this._endSize = !this._startIsBigger ? 1 : this._sizeRatio;
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
      <div class="c-scale-section__background">
      </div>
      <div class="
        o-section-block
        c-scale-section__outer
      ">
        ${this.data.Layout === 'ImageRight' && !this.data.ImageSpacing ? html`
            <div
              class="
                o-media-block
                o-media-block--split-flush-end
                c-scale-section__inner
              "
            >
              <div
                class="
                  o-media-block__item
                  c-scale-section__content
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
              <div
                class="
                  o-media-block__item
                  c-scale-section__image
                "
              >
                <img
                  src=${this.url + this.data.Image.url}
                >
              </div>
            </div>
          ` : this.data.Layout === 'ImageRight' ? html`
            <div
              class="
                o-media-block
                o-media-block--split
                c-scale-section__inner
              "
            >
              <div
                class="
                  o-media-block__item
                  c-scale-section__content
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
              <div
                class="
                  o-media-block__item
                  c-scale-section__image
                "
              >
                <img
                  src=${this.url + this.data.Image.url}
                >
              </div>
            </div>
          ` : this.data.Layout === 'ImageLeft' && !this.data.ImageSpacing ? html`
            <div
              class="
                o-media-block
                o-media-block--split-flush-start
              "
            >
              <div
                class="
                  o-media-block__item
                  c-scale-section__image
                "
              >
                <img
                  src=${this.url + this.data.Image.url}
                >
              </div>
              <div
                class="
                  o-media-block__item
                  c-scale-section__content
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
            </div>
          ` : this.data.Layout === 'ImageLeft' ? html`
            <div
              class="
                o-media-block
                o-media-block--split
              "
            >
              <div
                class="
                  o-media-block__item
                  c-scale-section__image
                "
              >
                <img
                  src=${this.url + this.data.Image.url}
                >
              </div>
              <div
                class="
                  o-media-block__item
                  c-scale-section__content
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
            </div>
          ` : this.data.Layout === 'Centered' && !this.data.ImageSpacing ? html`
            <div
              class="
                o-block
                o-block--narrow
                c-scale-section__content
              "
            >
              <div
                class="
                  u-text-align-center
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
            </div>
            <div
                class="
                  c-scale-section__image
                "
              >
                <img
                  src=${this.url + this.data.Image.url}
                >
            </div>
          ` : this.data.Layout === 'Centered' ? html`
            <div
              class="
                o-block
                o-block--narrow
                c-scale-section__inner
                u-justify-content-center
              "
            >
              <div
                class="
                  c-scale-section__content
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
              <div
                class="
                  c-scale-section__image
                  u-padding-horizontal-10-percent
                "
              >
                <img
                  src=${this.url + this.data.Image.url}
                >
              </div>
            </div>
          ` : this.data.Layout === 'CenteredImageFirst' && !this.data.ImageSpacing ? html`

            <div
                class="
                  c-scale-section__image
                "
              >
                <img
                  src=${this.url + this.data.Image.url}
                >
            </div>
            <div
              class="
                o-block
                o-block--narrow
                c-scale-section__content
              "
            >
              <div
                class="
                  u-text-align-center
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
            </div>
          ` : this.data.Layout === 'CenteredImageFirst' ? html`
            <div
              class="
                o-block
                o-block--narrow
                c-scale-section__inner
                u-justify-content-center
              "
            >
              <div
                class="
                  c-scale-section__image
                  u-padding-horizontal-10-percent
                "
              >
                <img
                  src=${this.url + this.data.Image.url}
                >
              </div>
              <div
                class="
                  c-scale-section__content
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
            </div>
          ` : this.Component === 'article' ? html`
            <div class='o-block o-block--align-start'>
              <div class="c-scale-section__content">
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>
            </div>
          ` : this.Component === 'background' && this.data.Heading === null && !this.data.Text.length ? html`

          ` : this.Component === 'background' ? html`
            <div class="
              o-block
              o-block--half@desktop
              c-scale-section__content
            ">
              <div>
                  <c-heading
                    data="
                      ${JSON.stringify(this.data.Heading)}
                    "
                    class="c-scale-section__heading"
                    color="inherit"
                  >
                  </c-heading>
                  <c-text-block
                    data=${JSON.stringify(this.data)}
                    class="c-scale-section__text"
                    color="inherit"
                  >
                  </c-text-block>
                </div>
            </div>
          ` : html`
            <div
              class="
                o-media-block
                o-media-block--split-flush-start
                c-scale-section__inner
              "
            >
              <div
                class="
                  o-media-block__item
                  c-scale-section__image
                "
              >
                <img
                  src=${this.url + this.Image.url}
                >
              </div>
              <div
                class="
                  o-media-block__item
                  c-scale-section__content
                "
              >
                <c-heading
                  data="
                    ${JSON.stringify(this.data.Heading)}
                  "
                  class="c-scale-section__heading"
                >
                </c-heading>
                <c-text-block
                  data=${JSON.stringify(this.data)}
                  class="c-scale-section__text"
                >
                </c-text-block>
              </div>

            </div>
          `}
      </div>
    `;
  }

}