/*
 *  Scripts - Components - Drive In */
import { LitElement, html, css } from '../../../modules/lit-element.js';
import * as basicScroll from '../../../modules/basicscroll.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
import { remote } from '../../config/remote.js';
export class DriveIn extends LitElement {
  static get styles() {
    return [initialize, objects, utilities, css`
      :host {
        background-color: white;
        display: block;
        overflow: hidden;
      }

      .c-drive-in__image-1-wrapper,
      .c-drive-in__image-2-wrapper {
        position: relative;
        will-change: transform;
      }

      .c-drive-in__image-1-wrapper img {
        transform: translateX(
          calc(20% + (var(--drive-in-translate)))
        );
        transform-origin: center right;
      }

      .c-drive-in__image-2-wrapper img {
        transform: translateX(
          calc(-80% + (var(--drive-in-translate)))
        );
        transform-origin: center left;
      }


      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.url = remote.url;
  }

  firstUpdated() {
    this._scrollSetup();
  }

  _scrollSetup() {
    this._scrollInstance = basicScroll.create({
      elem: this,
      from: 'top-bottom',
      to: 'bottom-top',
      direct: this,
      props: {
        '--drive-in-translate': {
          from: 0 + '%',
          to: 95 + '%'
        }
      }
    });

    this._scrollInstance.start();

    this.scrollInstances = [this._scrollInstance];
  }

  render() {
    return html`
    <div class="o-section-block">
      <div
        class="
          o-media-block
          o-media-block--split-flush-end
          c-block-section__inner
        "
      >
      <div class="o-media-block__item">
        <c-heading
          data=${JSON.stringify(this.data.Block1Heading)}
        >
        </c-heading>
        <c-text-block
            data=${JSON.stringify({
      Text: this.data.Block1Text
    })}
          >
          </c-text-block>
      </div>
      <div class="
          o-media-block__item
          c-drive-in__image-1-wrapper
        ">
          <img
            src=${this.url + this.data.Image.url}
            alt=${this.data.Image.alternativeText}
          >
        </div>
      </div>
      <div
        class="
          o-media-block
          o-media-block--split-flush-start
          c-block-section__inner
        "
      >
        <div class="
          o-media-block__item
          c-drive-in__image-2-wrapper
        ">
          <img
            src=${this.url + this.data.Image.url}
            alt=${this.data.Image.alternativeText}
          >
        </div>
        <div class="o-media-block__item">
          <c-heading
            data=${JSON.stringify(this.data.Block2Heading)}
          >
          </c-heading>
          <c-text-block
            data=${JSON.stringify({
      Text: this.data.Block2Text
    })}
          >
          </c-text-block>
        </div>
      </div>
    </div>
    `;
  }

}