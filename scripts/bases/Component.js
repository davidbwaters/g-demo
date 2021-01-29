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
  }

  async imagePreloader(images) {
    let imagesAbsolute = [];
    images.forEach(image => {
      imagesAbsolute = imagesAbsolute.concat(this.url + image);
    });
    let percentage = 100 / images.length;
    let preloader = new ImagePreloader();
    this.progress = 0;

    preloader.onProgress = progress => {
      console.log(this);

      if (this.hasAttribute('active')) {
        this.progress += percentage / 4; // console.log(images)
        // console.log(this.progress)

        requestAnimationFrame(progress => {
          document.querySelector('c-router-app').loaderEl.progress += percentage / 4;
        });
      }
    };

    await preloader.preload(...imagesAbsolute);
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

  addBlurFilter() {
    const filterWrapper = document.createElement('div');
    filterWrapper.style.height = 0;
    filterWrapper.innerHTML = `
      <svg>
        <defs>
          <filter id="blurFilterSuper">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10,0" />
          </filter>
        </defs>
      </svg>
    `;
    this.shadowRoot.appendChild(filterWrapper);
    this.blurFilter = filterWrapper.querySelector('#blurFilterSuper');
    this.hasBlurFilter = true;
  }

  blurAnimation() {
    if (!this.hasBlurFilter) {
      this.addBlurFilter();
    }

    setTimeout(() => {
      motionBlur(this.blurFilter);
    }, 100);
  }

}