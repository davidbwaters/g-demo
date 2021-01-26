/*
 *  Scripts - Pages - Media
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class MediaPage extends Page {
  static get styles() {
    return [initialize, objects, utilities, css`
        :host {
          display: block;
          height: 100%;
          padding-top: var(--navbar-height);
          width: 100%;
        }
      `];
  }

  static get properties() {
    return {
      data: {
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

  async preload() {
    this.albumCovers = [];
    this.pageImages = [];
    this.thumbnails = [];
    this.galleryData.albums.forEach(album => {
      if (album.Cover) {
        this.albumCovers = this.albumCovers.concat(album.Cover.url);
      }

      if (album.PageFeatureImage && album.PageFeatureImage.url) {
        this.pageImages = this.pageImages.concat(album.PageFeatureImage.url);
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
          this.thumbnails = this.thumbnails.concat(thumb);
        }
      });
    });
    await this.imagePreloader(this.albumCovers);
  }

  async preloadImages() {
    await this.imagePreloader(this.pageImages);
    await this.imagePreloader(this.thumbnails);

    if (this.debug) {
      console.log(this.albumCovers);
    }
  }

  handleFullImage(e) {
    console.log(e.target);
  }

  transitionIn() {}

  async performUpdate() {
    this.data = await this.getApiData(this.dataEndpoint);
    this.pageData = await this.getApiData(this.dataEndpoint);

    if (!this._galleryDataSet) {
      this._setGalleryData();
    }

    this.dispatchEvent(new CustomEvent('dataLoad'));
    super.performUpdate();
  }

  render() {
    return html` <div>
      <h1>Media</h1>
    </div>`;
  }

}