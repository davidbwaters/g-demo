/*
 *  Scripts - Components - Gallery
 */
import { LitElement, css, html } from '../../../modules/lit-element.js'; // import { motionBlur } from '../../utils/motionBlur'

import ScrollBooster from '../../../modules/scrollbooster.js';
export class Gallery extends LitElement {
  static get styles() {
    return css`

      :host {
        display: block;
        height: 100%;
        overflow-x: hidden;
        width: 100%;
      }

      .c-gallery__inner {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 40vw;
        scroll-snap-type: x mandatory;
      }

      .c-gallery__item {
        cursor: var(--gallery-item__cursor);
        margin-bottom: 3rem;
        margin-top: 3rem;
        min-width: 0;
        scroll-snap-align: start;
        text-align: center;
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

      :not(.is-grabbed) .c-gallery__item:hover {
        cursor: grab;
      }

      .is-grabbed .c-gallery__item:hover {
        cursor: grabbing;
      }

      .c-gallery__item img {
        height: auto;
        width: 100%;
      }

      .c-gallery-pointer {

      }

    `;
  }

  static get properties() {
    return {
      data: {
        type: Object
      },
      galleryData: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
    this.galleryData = {
      albums: []
    };
  }

  firstUpdated() {
    this._galleryEl = this.shadowRoot.querySelector('.c-gallery__inner');

    this._setMaxScroll();

    window.addEventListener('resize', () => {
      this._setMaxScroll();
    });
    this.scrollSetup();
  }

  _setGalleryData() {
    let count = 1;
    let sorted = [];
    this.data.forEach(item => {
      this.data.forEach(item => {
        if (item.id === count) {
          sorted = sorted.concat(item);
          count++;
        }
      });
    });
    sorted.forEach(item => {
      item.Album.forEach(album => {
        let newAlbum = album;
        newAlbum.Section = item.Title;
        newAlbum.SectionID = item.id;
        this.galleryData.albums = this.galleryData.albums.concat(newAlbum);
      });
    }); // console.log(this.galleryData)
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
      maxScroll
    }; // console.log('v ' + client)
    // console.log('w ' + items)
  }

  _handleScroll(state, event) {
    event.preventDefault();
    let oldPosition = state.position.x;
    let newPosition = oldPosition += event.deltaY * 3;
    let maxScroll = this._gallerySizes.maxScroll; // console.log('np ' + newPosition)

    if (newPosition < 0) {
      newPosition = 0;
    }

    if (newPosition > maxScroll) {
      newPosition = maxScroll;
    }

    let item = this._gallerySizes.item;
    let offset = Math.round(newPosition / item) * item; // console.log(state)
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

  _checkGrabbed() {
    return this._galleryEl.classList.contains('is-grabbed');
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
    this._setGalleryData(); // console.log(this.data)


    super.performUpdate();
  }

  render() {
    return html`

      <div class="c-gallery__inner">

        ${this.galleryData.albums.map(i => html`

          <div class="c-gallery__item">
            <img
              class="c-gallery__item-image"
              srcset=${this.url + i.Cover.formats.medium.url + ', ' + this.url + i.Cover.formats.large.url + ' 2x'}
              src=${this.url + i.Cover.formats.large.url}
              alt=${i.Cover.alternativeText}
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
          </div>

        `)}

      </div>

    `;
  }

}