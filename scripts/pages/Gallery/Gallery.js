/*
 *  Scripts - Pages - Gallery
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
import { imagesPreload, imagesPreloadedCheckWait } from '../../utils/imagesPreload.js';
import { generic } from '../../styles/generic.js';
export class GalleryPage extends LitElement {
  static get styles() {
    return [generic, css`
        :host {
          display: block;
          min-height: 100vh;
          overflow-x: hidden;
          width: 100%;
        }

        .c-gallery__instructions {
          color: var(--color-subtle-dark-4);
          display: block;
          text-transform: uppercase;
        }

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribute: false
      },
      loaded: {
        type: Boolean,
        reflect: true
      },
      galleryData: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
    this.handleLoad = this.handleLoad.bind(this);
    this.galleryData = {
      albums: []
    };
  }

  firstUpdated() {
    this.preloadImages();
    this.galleryEl = this.shadowRoot.querySelector('c-gallery');
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
        newAlbum.Slot = newAlbum.id;
        this.galleryData.albums = this.galleryData.albums.concat(newAlbum);
      });
    });
    this._galleryDataSet = true;
    console.log(this.galleryData);
  }

  preloadImages() {
    this.albumCovers = [];
    this.pageImages = [];
    this.thumbnails = [];
    this.galleryData.albums.forEach(album => {
      if (album.Cover) {
        this.albumCovers = this.albumCovers.concat(this.url + album.Cover.url);
      }

      if (album.PageFeatureImage && album.PageFeatureImage.url) {
        this.pageImages = this.pageImages.concat(this.url + album.PageFeatureImage.url);
      }

      album.Content.forEach(item => {
        let thumb;

        if (item.formats.small) {
          thumb = item.formats.small.url;
        } else if (item.formats.thumbnail) {
          thumb = item.formats.thumbnail.url;
        } else if (item.formats.medium) {
          thumb = item.formats.medium.url;
        } else if (item.url) {
          thumb = item.url;
        } else {
          console.log(item);
        }

        if (thumb) {
          this.thumbnails = this.thumbnails.concat(this.url + thumb);
        }
      });
    });
    this.albumCovers = imagesPreload(this.albumCovers);
    imagesPreloadedCheckWait(this.albumCovers, true);
    this.pageImages = imagesPreload(this.pageImages);
    imagesPreloadedCheckWait(this.pageImages, true);
    this.thumbnails = imagesPreload(this.thumbnails);
    imagesPreloadedCheckWait(this.thumbnails, true);
    console.log(this.albumCovers);
  }

  preload() {
    if (!this.data) {
      setTimeout(() => {
        this.preload();
      }, 500);
    } else {
      this.loaded = true;
    }
  }

  handleLoad() {
    if (this.loaded === true) {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });

      this._transitionIn();

      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
    } else {
      setTimeout(() => {
        this.handleLoad();
      }, 400);
    }
  }

  _transitionIn() {}

  async _getData() {
    const response = await fetch(this.url + '/galleries').then(res => res.json()).catch(err => console.error(err));
    return {
      statusCode: 200,
      body: response
    };
  }

  async performUpdate() {
    const data = await this._getData(data => {
      this.data = data;
    });
    this.data = data.body;

    if (!this._galleryDataSet) {
      this._setGalleryData();
    }

    console.log(this.data);
    super.performUpdate();
  }

  render() {
    return html`

      <section
        class="c-gallery-page"
      >
        <c-gallery
          data=${JSON.stringify(this.galleryData.albums)}
        >

          ${this.galleryData.albums.map(i => html`

            <div
              class="c-gallery-page__overlay"
              slot=${i.Slot}
            >
              <img
                src=${this.url + i.PageFeatureImage.url}
              >

            </div>

          `)}

        </c-gallery>
      </section>



      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        class="c-filters"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10,0" />
          </filter>
        </defs>
      </svg>

    `;
  }

}