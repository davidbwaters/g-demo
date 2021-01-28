/*
 *  Scripts - Components - Gallery
 */
import { LitElement, css, html } from '../../../modules/lit-element.js'; //import {
//  imagesPreload,
//  imagesPreloadedCheckWait
//} from '../../utils/imagesPreload'

import ScrollBooster from '../../../modules/scrollbooster.js';
import { remote } from '../../config/remote.js';
import { buttons } from '../../styles/components.buttons.js';
export class Gallery extends LitElement {
  static get styles() {
    return [buttons, css`
        :host {
          display: block;
          max-width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .c-gallery__wrapper {
          height: calc(100vh - (var(--navbar-height) * 2.5));
          overflow-x: hidden;
          overflow-y: auto;
          padding-bottom: calc(var(--navbar-height) * 1.5);
          padding-top: var(--navbar-height);
        }

        .c-gallery__inner {
          align-content: center;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 66%;
          grid-template-rows: calc(
            100vh - (var(--navbar-height) * 2.5)
          );
          scroll-snap-type: x mandatory;
        }

        [data-articles] .c-gallery__inner {

          padding-left: .5rem;

        }

        @media(min-width: 40rem) {

          .c-gallery__inner {
            grid-auto-columns: 40%;
          }

        }

        .c-gallery__item {
          cursor: var(--gallery-item__cursor);
          display: grid;
          min-width: 0;
          scroll-snap-align: start;
          text-align: center;
        }


        [data-articles] .c-gallery__item {

          padding-left: .5rem;
          padding-right: .5rem;

        }

        .c-gallery__item__inner {
          align-items: center;
          background-color: white;
          display: grid;
          grid-template-rows:
            1fr min-content min-content min-content;
          padding-bottom: 8vh;
          padding-top: 8vh;
          row-gap: 0rem;
          justify-items: center;
        }

        [data-articles] .c-gallery__item__inner {
          align-items: start;
          grid-template-rows:
            min-content 2fr 1fr min-content;
        }

        .c-gallery__item-title {
          display: block;
          font-weight: var(
            --font-bolder-weight
          );
        }

        .c-gallery__item-subtitle {
          display: block;
          font-size: calc(
            var(--text-size-title-tiny) * .9
          );
          font-weight: var(--font-weight-title-tiny);
          letter-spacing: var(--letter-spacing-title-tiny);
          line-height: var(--line-height-title-tiny);
          margin-bottom: .25rem;
          text-transform: uppercase;
        }

        [data-articles] .c-gallery__item-subtitle {
          display: block;
          font-size: var(--text-size-title-stylized);
          font-weight: var(--font-weight-title-stylized);
          letter-spacing: var(--letter-spacing-title-stylized);
          line-height: var(--line-height-title-stylized);
          margin-bottom: 0rem;
          text-transform: none;
        }

        .c-gallery__item:hover {
          cursor: grab;
        }

        .c-gallery__item:focus {
          cursor: grabbing;
        }

        .c-gallery__item-background-image {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          height: 30vh;
          margin-bottom: 2rem;
          padding-left: 0rem;
          padding-right: 0rem;
          width: 100%;
        }

        .c-gallery__item img {
          height: auto;
          width: 100%;
        }

        .c-gallery__lower {
          align-items: center;
          background-color: var(--color-bg-inverse);
          bottom: 0;
          box-sizing: border-box;
          color: var(--color-fg-inverse-subtle);
          column-gap: 2rem;
          display: grid;
          grid-template-columns: 1fr;
          height: calc(var(--navbar-height) * 1.5);
          justify-content: center;
          pointer-events: none;
          position: fixed;
          row-gap: 2rem;
          width: 100%;
        }

        .c-gallery__lower button {
          pointer-events: initial;
        }

        .c-gallery__lower img {
          cursor: pointer;
        }

        .c-gallery__lower-inner {
          align-items: center;
          box-sizing: border-box;
          display: grid;
          grid-auto-columns: 1fr;
          grid-auto-flow: column;
          justify-content: space-between;
          margin-left: auto;
          margin-right: auto;
          max-width: 58rem;
          padding-left: .5rem;
          padding-right: .5rem;
          width: 100%;
        }

        .c-gallery__instructions {
          font-size: calc(
            var(--text-size-title-stylized) * .8
          );
          font-weight: var(--font-weight-title-stylized);
          letter-spacing: var(--letter-spacing-title-stylized);
          line-height: var(--line-height-title-stylized);
          padding-left: .5rem;
        }


        @media(min-width: 40rem) {

          .c-gallery__instructions {
            font-size: calc(
              var(--text-size-title-stylized) * .9
            );
          }

        }

        .c-gallery__arrows {
          column-gap: 0rem;
          display: grid;
          grid-template-columns: auto auto;
          justify-content: center;
        }

        [data-articles] .c-gallery__arrows {
          justify-content: end;
          padding-right: .5rem;

        }

        [data-grid-button] {
          justify-self: end;
        }

        [data-articles] [data-grid-button] {
          display: none;
        }

        .c-gallery__close-button {
          display: none;
          position: absolute;
          top: .75rem;
          right: 1.25rem;
          z-index: 9;
        }


        .c-gallery__close-button.is-active {
          display: block;
        }

        .c-gallery__overlay {
          background-color: white;
          display: grid;
          height: 100%;
          min-height: 100vh;
          opacity: 0;
          overflow-y: scroll;
          pointer-events: none;
          position: absolute;
          top: 0;
          transform: translateY(100vh);
          transition: all .5s ease;
          will-change: transform, opacity;
          width: 100%;
        }

        .c-gallery__overlay.is-active {
          opacity: 1;
          pointer-events: initial;
          transform: translateY(0vh);
        }

        .c-gallery--grid-view.c-gallery__inner {
          grid-auto-flow: row;
          grid-template-columns: repeat(
            auto-fill, minmax(12rem, 1fr)
          );
          grid-template-rows: repeat(
            auto-fill, minmax(12rem, 1fr)
          );
          margin-bottom: 1rem;
          row-gap: 1rem;
          transform: none;
        }

        @media(min-width:30rem) {

          c-gallery--grid-view.c-gallery__inner {
            grid-template-columns: repeat(
              auto-fill, minmax(16rem, 1fr)
            );
            grid-template-rows: repeat(
              auto-fill, minmax(16rem, 1fr)
            );
          }

        }

        .c-gallery--grid-view .c-gallery__item__inner{
          row-gap: .2rem;
          padding-top: 0;
          padding-bottom: 0;
        }

        .c-gallery__arrows,
        .c-gallery__instructions {
          will-change: opacity;
          transition: all .5s;
        }
        .has-grid-layout .c-gallery__arrows,
        .has-grid-layout .c-gallery__instructions  {
          opacity: 0;
        }

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      type: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.url = remote.url;
    this.gridView = false;
    this.scrollerStop = this.scrollerStop.bind(this);
    this.scrollerStart = this.scrollerStart.bind(this);
  }

  firstUpdated() {
    console.log(this.data);
    this.wrapperEl = this.shadowRoot.querySelector('.c-gallery__wrapper');
    this.galleryEl = this.shadowRoot.querySelector('.c-gallery__inner');
    this.closeEl = this.shadowRoot.querySelector('.c-gallery__close-button');
    this.slotEl = this.shadowRoot.querySelector('slot');
    this._innerEl = this.shadowRoot.querySelector('.c-gallery__inner');
    this._layoutEl = this.shadowRoot.querySelector('[data-layout]');
    this._gridIconEl = this.shadowRoot.querySelector('[data-grid-button]').querySelector('c-icon');
    window.addEventListener('resize', () => {
      this.setMaxScroll();
    });
    this.setMaxScroll();
  }

  setMaxScroll() {
    const els = this.galleryEl.querySelectorAll('.c-gallery__item'); // console.log(this.galleryEl)

    let client = this.galleryEl.clientWidth;
    let length = els.length;
    let item = els[0].scrollWidth;
    let items = length * item;
    let maxScroll = items - client;
    this._gallerySizes = {
      client,
      length,
      item,
      items,
      maxScroll: maxScroll + 80
    }; // console.log('v ' + client)
    // console.log('w ' + items)
  }

  toggleGridView(e) {
    e.target.classList.toggle('is-toggled');
    this.galleryEl.style.transform = 'translate(0,0)';
    this.booster.scrollTo({
      x: 0,
      y: 0
    });
    this.galleryEl.classList.toggle('c-gallery--grid-view');

    this._layoutEl.classList.toggle('has-grid-layout');

    if (!this.gridView) {
      this.gridView = true;
      this.shouldScroll = false;
      this.booster.destroy();
      console.log(this._gridIconEl);

      this._gridIconEl.setAttribute('icon', 'columns');
    } else {
      this.shouldScroll = true;
      this.gridView = false;
      this.scrollerStart();

      this._gridIconEl.setAttribute('icon', 'grid');
    }
  }

  handleScroll(state, event) {
    event.preventDefault();
    let item = this._gallerySizes.item;
    let oldPosition = state.position.x;
    let newPosition = oldPosition += event.deltaY * 3;
    let maxScroll = this._gallerySizes.maxScroll; // console.log('np ' + newPosition)

    if (newPosition < 0) {
      newPosition = 0;
    }

    if (newPosition > maxScroll) {
      newPosition = maxScroll;
    }

    let offset = Math.round(newPosition / item) * item; // console.log(state)
    // console.log('op ' + oldPosition)
    // console.log('np ' + newPosition)
    // console.log('max ' + this._gallerySizes.maxScroll)

    this.booster.scrollTo({
      x: offset,
      y: state.position.y
    });
  }

  _handleArrow(e) {
    let direction = e.target.dataset.direction;
    let item = this._gallerySizes.item;
    let offset = item;

    if (direction === 'left') {
      offset = offset * -1;
    }

    let state = this.booster.getState();
    let oldPosition = state.position.x;
    let newPosition = oldPosition += offset;
    let maxScroll = this._gallerySizes.maxScroll; // console.log('np ' + newPosition)

    if (newPosition < 0) {
      newPosition = 0;
    }

    if (newPosition > maxScroll) {
      newPosition = maxScroll;
    }

    offset = Math.round(newPosition / item) * item; // console.log(state)
    // console.log('op ' + oldPosition)
    // console.log('np ' + newPosition)
    // console.log('max ' + this._gallerySizes.maxScroll)

    this.booster.scrollTo({
      x: offset,
      y: state.position.y
    });
  }

  handlePointerMove(state, event) {// console.log(state)
    // console.log(event.buttons)
  }

  scrollerStart() {
    this.booster = new ScrollBooster({
      viewport: this,
      content: this.galleryEl,
      scrollMode: 'transform',
      direction: 'horizontal',
      emulateScroll: true,
      preventDefaultOnEmulateScroll: true,
      onWheel: (state, event) => {
        if (this.shouldScroll) {
          console.log(this.shouldScroll);
          this.handleScroll(state, event);
        }
      },
      onPointerMove: (state, event) => {},
      shouldScroll: (state, event) => {
        return this.shouldScroll;
      }
    });
    this.shouldScroll = true;
  }

  scrollerStop() {
    this.booster.destroy();
    this.shouldScroll = false;
  }

  showOverlay(e) {
    this.scrollerStop();
    this.shouldScroll = false;
    console.log(e.target);
    this.currentSlot = e.target.dataset.slot;
    this.slotEl.setAttribute('name', this.currentSlot);
    this.slotEl.parentElement.classList.add('is-active');
    this.closeEl.classList.add('is-active');
    document.documentElement.style.setProperty('--navbar-opacity', 0);
    document.documentElement.style.setProperty('--navbar-pointer-events', 'none');
    document.documentElement.style.overflow = 'hidden';
  }

  hideOverlay(e) {
    this.scrollerStart();
    this.slotEl.removeAttribute('name', this.currentSlot);
    this.slotEl.parentElement.classList.remove('is-active');
    this.closeEl.classList.remove('is-active');
    document.documentElement.style.setProperty('--navbar-opacity', 1);
    document.documentElement.style.setProperty('--navbar-pointer-events', '');
    document.documentElement.style.overflow = '';
    this.currentSlot = '';
  }

  async performUpdate() {
    super.performUpdate();
  }

  render() {
    return html`

      <button
          @click=${this.hideOverlay}
          class="
            c-button c-button--icon
            c-gallery__close-button
          "
        >
          <c-icon icon="close"></c-icon>
      </button>


      ${this.type === 'articles' ? html`

          <div class="c-gallery__wrapper" data-articles>
            <div class="c-gallery__inner">

              ${this.data.map(i => html`

                <div class="c-gallery__item">
                  <div class="c-gallery__item__inner">

                    <div
                      class="c-gallery__item-background-image"
                      style=${'background-image: url(' + this.url + i.Cover.url + ');'}
                    ></div>

                    <c-heading
                      data=${JSON.stringify({
      Text: i.Title
    })}
                      size="small"
                      class="
                        c-gallery-page__overlay-title
                        c-gallery__item-title
                      "
                    >
                      ${i.Title}

                    </c-heading>
                    <span
                      class="c-gallery__item-subtitle"
                    >
                      ${i.Subtitle}
                    </span>
                    <a
                      class="
                        c-button
                      "
                      data-slot = ${i.id}
                      @click=${this.showOverlay}
                    >
                      Show More
                    </a>
                  </div>
                </div>

              `)}

            </div>

            <div
                class="c-gallery__lower"
            >
              <div
                class="c-gallery__lower-inner"
                data-layout
              >
                <div
                    class="c-gallery__instructions"
                >
                  Scroll to Navigate</br> or Click and Drag
                </div>
                <div
                  class="c-gallery__arrows"
                >
                  <button
                    @click=${this._handleArrow}
                    data-direction="left"
                    class="c-button c-button--icon"
                  >
                    <c-icon icon="angle-left"></c-icon>
                  </button>
                  <button
                    @click=${this._handleArrow}
                    data-direction="right"
                    class="c-button c-button--icon"
                  >
                    <c-icon icon="angle-right"></c-icon>
                  </button>
                </div>
                <button
                  @click=${this.toggleGridView}
                  class="
                    c-button
                    c-button--icon
                    c-button--round
                  "
                  data-grid-button
                >
                  <c-icon icon="grid"></c-icon>
                </button>
              </div>
            </div>

            <div
              class="c-gallery__overlay"
            >

              <slot></slot>
            </div>
          </div>
        ` : html`
          <div class="c-gallery__wrapper">
            <div class="c-gallery__inner">

              ${this.data.map(i => html`

                <div class="c-gallery__item">
                  <div class="c-gallery__item__inner">

                    <img
                      class="c-gallery__item-image"
                      src=${this.url + i.Cover.url}
                      alt=${i.Cover.alternativeText}
                      data-slot=${i.id}
                    >

                    <c-heading
                      data=${JSON.stringify({
      Text: i.Title
    })}
                      class="
                        c-gallery-page__overlay-title
                        c-gallery__item-title
                      "
                      size="small"
                    >
                      ${i.Title}

                    </c-heading>
                    <span
                      class="c-gallery__item-subtitle"
                    >
                      ${i.Subtitle}
                    </span>
                    <a
                      class="
                        c-button
                      "
                      data-slot = ${i.id}
                      @click=${this.showOverlay}
                    >
                      Show More
                    </a>
                  </div>
                </div>

              `)}

            </div>

            <div
                class="c-gallery__lower"
            >
              <div
                class="c-gallery__lower-inner"
                data-layout
              >
                <div
                    class="c-gallery__instructions"
                >
                  Scroll to Navigate</br> or Click and Drag
                </div>
                <div
                  class="c-gallery__arrows"
                >
                  <button
                    @click=${this._handleArrow}
                    data-direction="left"
                    class="
                      c-button
                      c-button--icon
                      c-button--round
                    "
                  >
                    <c-icon icon="angle-left"></c-icon>
                  </button>
                  <button
                    @click=${this._handleArrow}
                    data-direction="right"
                    class="
                      c-button
                      c-button--icon
                      c-button--round
                    "
                  >
                    <c-icon icon="angle-right"></c-icon>
                  </button>
                </div>
                <button
                  @click=${this.toggleGridView}
                  class="c-button c-button--icon"
                  data-grid-button
                >
                  <c-icon icon="grid"></c-icon>
                </button>
              </div>
            </div>

            <div
              class="c-gallery__overlay"
            >
              <slot></slot>
            </div>
          </div>
        `}

    `;
  }

}