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

        .c-gallery-page__overlay {
          display: grid;
          align-content: center;
          justify-content: center;
          padding-top: 2rem;
          row-gap: 4rem;
        }

        .c-gallery-page__overlay-title {
        }


        @media(min-width:40rem) {

          .c-gallery-page__overlay-title {
          }

        }

        .c-gallery-page__overlay-feature-image {
          margin-left: auto;
          margin-right: auto;
          max-width: 60rem;
          width: 90%;
        }


        @media(min-width:40rem) {

          .c-gallery-page__overlay-feature-image {
            width: 80%;
          }

        }

        .c-gallery-page__overlay-block-1-text,
        .c-gallery-page__overlay-block-2-text {
          align-content: center;
          display: grid;
          justify-content: center;
          padding-bottom: 2rem;
          padding-left: 2rem;
          padding-right: 2rem;
          padding-top: 2rem;
        }

        .c-gallery-page__overlay-block-1,
        .c-gallery-page__overlay-block-2 {
          align-content: center;
          display: grid;
          grid-template-columns: 90%;
          grid-template-rows: 1fr 1fr;
          justify-content: center;
        }

        @media(min-width:40rem) {

          .c-gallery-page__overlay-block-1,
          .c-gallery-page__overlay-block-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
          }

        }

        .c-gallery-page__overlay-lower {
          align-content: center;
          display: grid;
          grid-gap: 2rem;
          grid-template-columns: 1fr 1fr;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          max-width: 40rem;
          width: 90%;
        }

        @media(min-width:40rem) {

          .c-gallery-page__overlay-lower {
            width: 80%;
          }

        }

        .c-gallery-page__overlay-lower img {
          cursor: pointer;
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

  fullImage(e) {
    console.log(e.target);
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
              <c-heading
                text=${i.PageTitle}
                class="c-gallery-page__overlay-title"
                size="medium"
              >
              </c-heading>
              <img
                src=${this.url + i.PageFeatureImage.url}
                class="c-gallery-page__overlay-feature-image"
              >

              <div
                class="c-gallery-page__overlay-block-1"
              >
                <div
                  class="c-gallery-page__overlay-block-1-text"
                >
                  <c-heading
                    text=${i.PageBlock1Heading}
                  >
                  </c-heading>
                  <c-text-block
                    content=${i.PageBlock1Text}
                    textAlign=left
                    isFlush=true
                  >
                  </c-text-block>
                </div>

                <div
                  class="c-gallery-page__overlay-block-1-image"
                >
                  <img
                    src=${this.url + i.PageBlock1Image.url}
                    alt=${i.PageBlock1Image.alternativeText}
                  >
                </div>
              </div>


              <div
                class="c-gallery-page__overlay-block-2"
              >

                <div
                  class="c-gallery-page__overlay-block-2-image"
                >
                  <img
                    src=${this.url + i.PageBlock2Image.url}
                    alt=${i.PageBlock2Image.alternativeText}
                  >
                </div>

                <div
                  class="c-gallery-page__overlay-block-2-text"
                >
                  <c-heading
                    text=${i.PageBlock2Heading}
                    size="medium"
                    textAligne="left"
                  >
                  </c-heading>
                  <c-text-block
                    content=${i.PageBlock2Text}
                    isFlush=true
                  >
                  </c-text-block>
                </div>

              </div>

              <div
                class="c-gallery-page__overlay-lower"
              >

                ${i.Content.map(p => html`

                  <img src=${this.url + p.formats.medium.url}
                    data-full=${this.url + p.url}
                    @click=${this.fullImage}
                  >

                `)}

              </div>

            </div>


          `)}

        </c-gallery>
      </section>




    `;
  }

}