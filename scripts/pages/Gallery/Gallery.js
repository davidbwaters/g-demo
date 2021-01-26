/*
 *  Scripts - Pages - Gallery
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import Chocolat from '../../../modules/chocolat.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class GalleryPage extends Page {
  static get styles() {
    return [initialize, objects, utilities, css`
        :host {
          display: block;
          min-height: 100vh;
          overflow-x: hidden;
          width: 100%;
        }

        .c-gallery-page__overlay {
          display: grid;
          align-content: center;
          justify-content: center;
          padding-top: 2rem;
          row-gap: 0rem;
        }

        .c-gallery-page__overlay-title {
          margin-bottom: 1rem;
          text-align: center;
        }

        .c-gallery-page__overlay-lower {
          align-content: center;
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: repeat(
            auto-fill, minmax(8rem, 1fr)
          );
          padding-bottom: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 1rem;
          justify-content: center;
        }

        @media(min-width:40rem) {

          c-gallery-page__overlay-lower {
            align-content: center;
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(
              auto-fill, minmax(12rem, 1fr)
            );
          }

        }

        .c-gallery-page__overlay-lower img {
          cursor: pointer;
        }

        .c-gallery-page__image-frame {

        }

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribute: false
      },
      pageData: {
        type: Object,
        attribute: false
      },
      debug: {
        type: Boolean,
        attribute: false
      },
      loaded: {
        type: Boolean,
        reflect: true
      },
      loadProgress: {
        type: Number,
        reflect: true
      },
      galleryData: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.dataEndpoint = '/image-galleries';
    this.pageEndpoint = '/albums';
    this.galleryData = {
      albums: []
    };
    this.debug = true;
  }

  firstUpdated() {
    // this.preloadImages()
    this.galleryEl = this.shadowRoot.querySelector('c-gallery');
    Chocolat(this.shadowRoot.querySelectorAll('.chocolat-image'));
  }

  _setGalleryData() {
    let count = 1;
    let albums = [];
    this._galleryDataSet = true;
    console.log(this.galleryData);
  }

  async preload() {
    this.albumCovers = [];
    this.pageImages = [];
    this.thumbnails = [];
    this.data.forEach(album => {
      if (album.Cover) {
        this.albumCovers = this.albumCovers.concat(album.Cover.url);
      }

      if (album.HeaderImage && album.HeaderImage.url) {
        this.pageImages = this.pageImages.concat(album.HeaderImage.url);
      }

      album.Images.forEach(item => {
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
          this.thumbnails = this.thumbnails.concat(thumb);
        }
      });
    });
    await this.imagePreloader(this.albumCovers);
  }

  async preloadImages() {
    await this.imagePreloader(this.pageImages);
    await this.imagePreloader(this.thumbnails);

    if (this.debug) {//console.log(this.albumCovers)
    }
  }

  handleFullImage(e) {
    console.log(e.target);
  }

  transitionIn() {}

  async performUpdate() {
    this.data = await this.getApiData(this.dataEndpoint);
    this.pageData = await this.getApiData(this.pageEndpoint);
    console.log(this.data);
    console.log(this.pageData);

    if (!this._galleryDataSet) {
      this._setGalleryData();
    }

    this.dispatchEvent(new CustomEvent('dataLoad'));
    super.performUpdate();
  }

  buildComponents() {}

  render() {
    return html`
      <link rel="stylesheet" href="/stylesheets/chocolat.css">
      <section
        class="c-gallery-page__wrapper"
      >
        <c-gallery
          data=${JSON.stringify(this.data)}
        >

          ${this.data.map(i => html`

            <div
              slot=${i.id}
              class="c-gallery-page__overlay"
            >

            <c-heading
                data=${JSON.stringify({
      Text: i.Name
    })}
                class="c-gallery-page__overlay-title"
                size="medium"
              >
              </c-heading>
              <img
                src=${this.url + i.HeaderImage.url}
                class="c-gallery-page__overlay-feature-image"
              >

              <div
                class="c-gallery-page__content"
              >
                ${this.buildComponent(i.Page)}
              </div>


              <div
                class="c-gallery-page__overlay-lower"
              >

                ${i.Images.map(p => html`

                  <img
                    src=${this.url + p.formats.medium.url}
                    class="chocolat-image"
                    href=${this.url + p.url}
                  >

                `)}

              </div>

              <div
                class="c-gallery-page__image-frame"
              >
              </div>

            </div>


          `)}

        </c-gallery>
      </section>

    `;
  }

}