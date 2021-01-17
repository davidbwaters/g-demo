/*
 *  Scripts - Bases - Component
 */

/* Component base class */
import { LitElement } from '../../modules/lit-element.js';
import { remote } from '../config/remote.js';
import ImagePreloader from '../../modules/image-preloader.js';
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

    if (this.loadProgress) {
      this.loadProgress = 0;

      if (preloader.onProgress) {
        preloader.onProgress(progress => {
          this.loadProgress += percentage;
          requestAnimationFrame(progress => {
            document.querySelector('c-router-app').loaderEl.progress = progress;
          });
        });
      }
    }

    await preloader.preload(...imagesAbsolute);
  }

  async getApiData(endpoint) {
    const response = await fetch(this.url + endpoint).then(res => res.json()).catch(err => console.error(err));
    return response;
  }

}