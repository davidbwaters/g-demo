/*
 *  Scripts - Bases - Component
 */

/* Component base class */
import { LitElement } from '../../modules/lit-element.js';
import { remote } from '../config/remote.js';
import ImagePreloader from '../../modules/image-preloader.js';
import { motionBlur } from '../utils/motionBlur.js';
export class Component extends LitElement {
  constructor() {
    super();
    this.url = remote.url;
    this.addBlurFilter = this.addBlurFilter.bind(this);
    this.blurAnimation = this.blurAnimation.bind(this);
  }

  async imagePreloader(images, url) {
    let imagesAbsolute = [];
    let imgUrl;

    if (url === '' || url) {
      imgUrl = url;
    } else {
      imgUrl = this.url;
    }

    images.forEach(image => {
      imagesAbsolute = imagesAbsolute.concat(imgUrl + image);
    });
    let percentage = 100 / images.length;
    let preloader = new ImagePreloader();
    this.progress = 0;
    this.loaderEl = document.querySelector('c-router-app').loaderEl;
    this.loaderEl.realProgress = true;

    preloader.onProgress = progress => {
      if (this.debug) {
        console.log(progress);
      }

      if (this.hasAttribute('active') && this.loaderEl.realProgress === true) {
        this.progress += percentage / 2;
        requestAnimationFrame(progress => {
          this.loaderEl.progress += percentage / 4;
        });
      }
    };

    await preloader.preload(...imagesAbsolute).catch(err => console.error(err));
    this.imagePreload = preloader;
    this.loaderEl.realProgress = false;
  }

  async getApiData(endpoint) {
    const response = await fetch(this.url + endpoint).then(res => res.json()).catch(err => console.error(err));
    return response;
  }

  onDeactivate() {
    if (this.debug) {
      console.log('Deactivating route ...');
    }

    if (this.basicScrolls && this.basicScrolls.length) {
      this.basicScrolls.forEach(el => {
        if (el.scrollInstances && el.scrollInstances.length) {
          el.scrollInstances.forEach(i => {
            i.stop();
          });
        }
      });
    }

    if (this.boosters && this.boosters.length) {
      this.boosters.forEach(el => {
        if (el.booster) {
          el.booster.destroy();
        }
      });
    }
  }

  addBlurFilter(a = 10) {
    const filterWrapper = document.createElement('div');
    filterWrapper.style.height = 0;
    filterWrapper.innerHTML = `
      <svg>
        <defs>
          <filter id="blurFilterSuper">
            <feGaussianBlur in="SourceGraphic" stdDeviation="${a},0" />
          </filter>
        </defs>
      </svg>
    `;
    this.shadowRoot.appendChild(filterWrapper);
    this.blurFilter = filterWrapper.querySelector('#blurFilterSuper');
    this.hasBlurFilter = true;
  }

  blurAnimation(a = 10, t) {
    if (!this.hasBlurFilter) {
      this.addBlurFilter(a);
    }

    setTimeout(() => {
      motionBlur(this.blurFilter, a, t);
    }, 100);
  }

}