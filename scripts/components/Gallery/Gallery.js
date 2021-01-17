/*
 *  Scripts - Components - Gallery
 */
import { LitElement, css, html } from '../../../modules/lit-element.js'; //import {
//  imagesPreload,
//  imagesPreloadedCheckWait
//} from '../../utils/imagesPreload'

import ScrollBooster from '../../../modules/scrollbooster.js';
export class Gallery extends LitElement {
  static get styles() {
    return [css`

        :host {
          display: block;
          max-width: 100vw;
          height: 100vh;
          padding-bottom: calc(var(--navbar-height) * 1.5);
          padding-top: var(--navbar-height);
          overflow-x: hidden;
          position: relative;
          width: 100%;
        }

        .c-gallery__inner {
          align-content: center;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 100%;
          grid-template-rows: calc(
            100vh - (var(--navbar-height) * 2.5)
          );
          scroll-snap-type: x mandatory;
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

        .c-gallery__item-title {
          display: block;
          font-size: var(
            --text-size-heading-small
          );
          font-weight: var(
            --font-bolder-weight
          );
          line-height: var(
            --line-height-heading-small
          );
          margin-bottom: .75rem;
        }

        .c-gallery__item-subtitle {
          display: block;
          font-size: var(--text-size-title-tiny);
          font-weight: var(--font-weight-title-tiny);
          letter-spacing: var(--letter-spacing-title-tiny);
          line-height: var(--line-height-title-tiny);
          margin-bottom: .25rem;
          text-transform: uppercase;
        }

        .c-gallery__item:hover {
          cursor: grab;
        }

        .c-gallery__item:focus {
          cursor: grabbing;
        }

        .c-gallery__item img {
          height: auto;
          width: 100%;
        }

        .c-gallery__item img:hover {
          cursor: pointer;
        }

        .c-gallery__lower {
          align-items: center;
          background-color: var(--color-subtle-dark-2);
          bottom: 0;
          box-sizing: border-box;
          color: var(--color-subtle-light-1);
          column-gap: 2rem;
          display: grid;
          grid-template-columns: minmax(90%, 58rem);
          height: calc(var(--navbar-height) * 1.5);
          justify-content: center;
          position: fixed;
          row-gap: 2rem;
          width: 100%;
        }

        .c-gallery__lower-inner {
          display: grid;
          grid-auto-flow: column;
          justify-content: space-between;
          max-width: 58rem;
          padding-bottom: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 1rem;
        }

        .c-gallery__instructions {
          font-size: calc(
            var(--text-size-title-stylized) * .8
          );
          font-weight: var(--font-weight-title-stylized);
          letter-spacing: var(--letter-spacing-title-stylized);
          line-height: var(--line-height-title-stylized);
        }


        @media(min-width: 40rem) {

          .c-gallery__instructions {

            font-size: var(--text-size-title-stylized);
          }
        }

        .c-gallery__arrows {
          column-gap: .75rem;
          display: grid;
          grid-template-columns: auto auto;
          justify-content: center;
        }

        .c-gallery__arrows button,
        .c-gallery__arrows button:focus,
        .c-gallery__close-button,
        .c-gallery__close-button:focus {
          background-color: var(--color-subtle-dark-2);
          background-position: center center;
          background-repeat: no-repeat;
          border: solid 1px var(--color-subtle-light-2);
          border-radius: 20rem;
          color: white;
          cursor: pointer;
          height: 2.5rem;
          outline: none;
          transition: all .25s ease;
          width: 2.5rem;
          will-change: filter;
        }

        .c-gallery__arrows button,
        .c-gallery__arrows button:focus {
          background-size: .75rem .75rem;
          cursor: pointer;
          height: 2.5rem;
          outline: none;
          width: 2.5rem;
          will-change: filter;
        }

        .c-gallery__arrows button:hover {
          background-color: black;
          filter: invert();
        }

        .c-gallery__arrows button[data-direction="right"] {
          background-image: url(
            '/images/Icons/Arrow Light Right.svg'
          );
        }
        .c-gallery__arrows button[data-direction="left"] {
          background-image: url(
            '/images/Icons/Arrow Light Left.svg'
          );
        }

        .c-gallery__close-button {
          background-color: black;
          background-image: url(
            '/images/Icons/X Light.svg'
          );
          background-size: 1rem;
          filter: invert();
          padding-bottom: 1.3rem;
          padding-left: 1.3rem;
          padding-right: 1.3rem;
          padding-top: 1.3rem;
          position: sticky;
          margin-left: auto;
          margin-top: 1.5rem;
          right: 1.5rem;
          z-index: 9;
        }

        .c-gallery__close-button:hover {
          background-color: black;
          filter: initial;
        }


        .c-gallery__grid-toggle,
        .c-gallery__grid-toggle:focus {
          background-color: var(--color-subtle-dark-2);
          background-image: url(
            '/images/Icons/Grid Light.svg'
          );
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 1rem;
          border: solid 1px var(--color-subtle-light-2);
          cursor: pointer;
          height: 2.5rem;
          outline: none;
          transition: all .2s;
          width: 2.5rem;
          will-change: filter;
        }

        .c-gallery__grid-toggle:hover {
          background-color: black;
        }

        .c-gallery__grid-toggle.is-toggled {
          background-image: url(
            '/images/Icons/Column Light.svg'
          );
        }

        .c-gallery__grid-toggle:hover {
          filter: invert();
        }

        .c-gallery__item-button {
          background-color: var(--button-normal-bg);
          border-radius: .2rem;
          color: var(--button-normal-fg);
          cursor: pointer;
          display: block;
          font-size: var(--text-size-title-stylized);
          font-weight: var(--font-weight-title-stylized);
          letter-spacing: var(--letter-spacing-title-stylized);
          line-height: var(--line-height-title-stylized);
          margin-bottom: 1rem;
          margin-left: 1rem;
          margin-right: 1rem;
          margin-top: 1rem;
          padding-bottom: .5rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: .5rem;
        }

        .c-gallery__overlay {
          background-color: white;
          opacity: 0;
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

        .c-gallery__close-button {
          display: none;
        }

        .is-active .c-gallery__close-button {
          display: block;
        }

        .c-gallery__pointer {

        }

        .c-gallery--grid-view.c-gallery__inner {
          grid-auto-flow: row;
          grid-template-columns: repeat(
            auto-fill, minmax(12rem, 1fr)
          );
          grid-template-rows: repeat(
            auto-fill, minmax(12rem, 1fr)
          );
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
          row-gap: 0;
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
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
    this.gridView = false;
  }

  firstUpdated() {
    this._galleryEl = this.shadowRoot.querySelector('.c-gallery__inner');
    this._slotEl = this.shadowRoot.querySelector('slot');
    this._innerEl = this.shadowRoot.querySelector('.c-gallery__inner');
    this._layoutEl = this.shadowRoot.querySelector('[data-layout]');

    this._setMaxScroll();

    window.addEventListener('resize', () => {
      this._setMaxScroll();
    });
    this.scrollSetup();
  }

  _setMaxScroll() {
    const els = this._galleryEl.querySelectorAll('.c-gallery__item'); // console.log(this._galleryEl)


    let client = this._galleryEl.clientWidth;
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

  handleGridView(e) {
    e.target.classList.toggle('is-toggled');

    this._innerEl.classList.toggle('c-gallery--grid-view');

    this._layoutEl.classList.toggle('has-grid-layout');

    if (!this.gridView) {
      this.gridView = true;
      this.booster.destroy();
    } else {
      this.scrollSetup();
    }
  }

  _handleScroll(state, event) {
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

  _handlePointerMove(state, event) {// console.log(state)
    // console.log(event.buttons)
  }

  handleClick(e) {
    this.currentSlot = e.target.dataset.slot;

    this._slotEl.setAttribute('name', this.currentSlot);

    this._slotEl.parentElement.classList.add('is-active');

    this.booster.destroy();
    document.body.style.setProperty('--navbar-opacity', 0);
    document.body.style.setProperty('--navbar-pointer-events', 'none');
    document.documentElement.style.overflow = 'hidden';
  }

  handleClose(e) {
    this.scrollSetup();

    this._slotEl.removeAttribute('name', this.currentSlot);

    this._slotEl.parentElement.classList.remove('is-active');

    document.body.style.setProperty('--navbar-opacity', 1);
    document.body.style.setProperty('--navbar-pointer-events', '');
    document.documentElement.style.overflow = '';
    this.currentSlot = '';
  }

  scrollSetup() {
    this.booster = new ScrollBooster({
      viewport: this,
      content: this._galleryEl,
      scrollMode: 'transform',
      direction: 'horizontal',
      emulateScroll: true,
      preventDefaultOnEmulateScroll: true,
      onWheel: (state, event) => {
        this._handleScroll(state, event);
      },
      onPointerMove: (state, event) => {
        this._handlePointerMove(state, event);
      }
    });
  }

  async performUpdate() {
    console.log(this.data);
    super.performUpdate();
  }

  render() {
    return html`

      <div class="c-gallery__inner">

        ${this.data.map(i => html`

          <div class="c-gallery__item">
            <div class="c-gallery__item__inner">
              <img
                class="c-gallery__item-image"
                srcset=${this.url + i.Cover.formats.medium.url + ', ' + this.url + i.Cover.formats.large.url + ' 2x'}
                src=${this.url + i.Cover.formats.large.url}
                alt=${i.Cover.alternativeText}
                data-slot=${i.Slot}
                @click=${this.handleClick}
              >
              <span
                class="c-gallery__item-title"
              >
                ${i.Title}
              </span>
              <span
                class="c-gallery__item-subtitle"
              >
                ${i.Section}
              </span>
              <a
                class="
                  c-gallery__item-button
                "
                data-slot = ${i.Slot}
                @click=${this.handleClick}
              >
                Expand
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
            ></button>
            <button
              @click=${this._handleArrow}
              data-direction="right"
            >
            </button>
          </div>
          <button
            @click=${this.handleGridView}
            class="c-gallery__grid-toggle"
          >
          </button>
        </div>
      </div>
      <div
        class="c-gallery__overlay"
      >
        <button
          class="c-gallery__close-button"
          @click=${this.handleClose}
        ></button>

        <slot></slot>
      </div>
    `;
  }

}