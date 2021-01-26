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
    this.progress = 0;

    preloader.onProgress = progress => {
      console.log(this);

      if (this.hasAttribute('active')) {
        this.progress += percentage / 4;
        console.log(images);
        console.log(this.progress);
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

}