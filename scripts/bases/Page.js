/*
 *  Scripts - Bases - Page
 */

/* Page base class */
import { html, render } from '../../modules/lit-html.js';
import { Component } from './Component.js';
import { motionBlur } from '../utils/motionBlur.js';
export class Page extends Component {
  constructor() {
    super();
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePreload = this.handlePreload.bind(this);
    this.addEventListener('dataLoad', this.handleDataLoad);
    this.addEventListener('preload', this.handlePreload);
    this.debug = true;
  }

  handleDataLoad() {
    this.dataLoaded = true;

    if (this.debug) {
      console.log('Data loaded ' + this.dataEndpoint);
    }

    if (this.active) {
      this.handlePreload();
    }

    this.removeEventListener('dataLoad', this.handleDataLoad);
  }

  async handlePreload() {
    if (!this.dataLoaded) {
      this._watingForData = true;
      this.addEventListener('dataLoad', this.handlePreload);
    } else {
      await this.preload();
      this.dispatchEvent(new CustomEvent('preloaded'));
      this.loaded = true;

      if (this.debug) {
        console.log('Preloaded ' + this.dataEndpoint);
      }

      if (this._watingForData) {
        this._watingForData = false;
        this.removeEventListener('dataLoad', this.handlePreload);
      }
    }
  }

  handleLoad() {
    this.transitionIn();
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  async performUpdate() {
    this.data = await this.getApiData(this.dataEndpoint);
    this.removeAttribute('data');
    this.dispatchEvent(new CustomEvent('dataLoad'));

    if (this.debug) {
      console.log(this.data);
    }

    super.performUpdate();
  }

  onActivate() {
    if (this.debug) {
      console.log('Activating route ...');
    }

    this.basicScrolls = [...this.shadowRoot.querySelectorAll('c-scale-section'), ...this.shadowRoot.querySelectorAll('c-fade-transition'), ...this.shadowRoot.querySelectorAll('c-angle-section'), ...this.shadowRoot.querySelectorAll('c-reveal-section')];
    this.boosters = [...this.shadowRoot.querySelectorAll('c-gallery')];

    if (this.basicScrolls && this.basicScrolls.length) {
      this.basicScrolls.forEach(el => {
        if (el.scrollInstances && el.scrollInstances.length) {
          el.scrollInstances.forEach(i => {
            i.start();
          });
        }
      });
    }

    if (this.boosters && this.boosters.length) {
      this.boosters.forEach(el => {
        el.scrollSetup();
      });
    }
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

  blurAnimation() {
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
    setTimeout(() => {
      motionBlur(this.blurFilter);
    }, 100);
  }

  transitionIn() {}

  async preload() {}

}