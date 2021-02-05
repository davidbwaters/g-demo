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
          height: var(--gallery-height);
          min-height: 100%;
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

          .c-gallery-page__overlay-lower {
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

      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribute: false
      },
      contentData: {
        type: Object,
        attribute: false
      },
      debug: {
        type: Boolean,
        attribute: false
      },
      galleryItems: {
        type: Array
      },
      hideFooter: {
        type: Boolean
      },
      loaded: {
        type: Boolean,
        reflect: true
      },
      loadProgress: {
        type: Number,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.pageEndpoint = '/albums';
    this.dataEndpoint = '/image-galleries';
    this.hideFooter = true;
    this.debug = false;
    this.hasBooster = true;
    let galleryReady;
    this.addEventListener('GalleryReady', () => {
      galleryReady = true;
    });
    this.galleryReady = galleryReady;
  }

  firstUpdated() {
    this.galleryEl = this.shadowRoot.querySelector('c-gallery');
    this.galleryEl.covers = this.albumCovers;
  }

  async preload() {
    this.albumCovers = [];
    this.pageImages = [];
    this.thumbnails = [];
    this.galleryItems = [];
    this.pageData.Content.forEach(item => {
      this.galleryItems = this.galleryItems.concat({
        id: item.Gallery.id,
        Cover: item.Gallery.Cover,
        Title: item.Gallery.Name,
        Subtitle: item.Category,
        Images: item.Gallery.Images,
        HeaderImage: item.Gallery.HeaderImage,
        PageContent: this.contentData.filter(obj => {
          return obj.id === item.Gallery.id;
        })[0].Page
      });

      if (item.Gallery.Cover) {
        this.albumCovers = this.albumCovers.concat(item.Gallery.Cover.url);
      }

      if (item.Gallery.HeaderImage && item.Gallery.HeaderImage.url) {
        this.pageImages = this.pageImages.concat(item.Gallery.HeaderImage.url);
      }

      item.Gallery.Images.forEach(item => {
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

  transitionIn() {}

  async performUpdate() {
    this.pageData = await this.getApiData(this.pageEndpoint);
    this.contentData = await this.getApiData(this.dataEndpoint);
    await this.preload();
    this.dispatchEvent(new CustomEvent('dataLoad'));
    super.performUpdate();
  }

  render() {
    return html`
      <section
        class="c-gallery-page__wrapper"
      >
        <c-gallery
          data=${JSON.stringify(this.galleryItems)}
          data-component
        >

          ${this.galleryItems.map(i => html`

            <div
              slot=${i.id}
              class="c-gallery-page__overlay"
            >

              <c-heading
                data=${JSON.stringify({
      Text: i.Title
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
                ${i.PageContent.map(j => {
      return this.buildComponent(j);
    })}
              </div>


              <div
                class="c-gallery-page__overlay-lower"
              >

                ${i.Images.map(p => html`

                  <img
                    src=${this.url + p.formats.medium.url}
                    class="chocolat-image"
                    href=${this.url + p.url}
                    data-gallery-thumb
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