/*
 *  Scripts - Bases - Page
 */

/* Page base class */
import { Component } from './Component.js';
import { buildComponent } from '../utils/buildComponent.js';
import { initialize } from '../styles/initialize.js';
import { objects } from '../styles/objects.js';
import { utilities } from '../styles/utilities.js';
export class Page extends Component {
  static get styles() {
    return [initialize, objects, utilities];
  }

  constructor() {
    super();
    console.log(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePreload = this.handlePreload.bind(this);
    this.addEventListener('dataLoad', this.handleDataLoad);
    this.addEventListener('preload', this.handlePreload);
    this.buildComponent = buildComponent;
    this.content = [];
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

  async loadChildren() {
    await this.updateComplete;
    await super.updateComplete;
    let children = this.shadowRoot.querySelectorAll('[data-api-component]');
    children = [...children];
    await Promise.all(children.map(c => c.updateComplete));
  }

  async handlePreload() {
    if (!this.dataLoaded) {
      this._watingForData = true;
      this.addEventListener('dataLoad', this.handlePreload);
    } else {
      await this.loadChildren();
      await this.preload();

      if (this.debug) {
        console.log('awaited preload');
      }

      this.loaded = true;
      this.setAttribute('loaded', true);
      this.dispatchEvent(new CustomEvent('preloaded'));

      if (this.debug) {
        console.log('Preloaded ' + this.dataEndpoint);
      }

      if (this._watingForData) {
        this._watingForData = false;
        this.removeEventListener('dataLoad', this.handlePreload);
      }
    }
  }

  async handleLoad() {
    this.transitionIn();
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  addBlurFilter() {//super.addBlurFilter()
  }

  blurAnimation() {//super.blurAnimation()
  }

  async performUpdate() {
    this.data = await this.getApiData(this.dataEndpoint);
    this.dispatchEvent(new CustomEvent('dataLoad'));
    super.performUpdate();
  }

  buildComponents() {
    if (!this.contentBuilt) {
      this.data.Content.forEach(i => {
        this.content = this.content.concat(buildComponent(i, this.data, this.url));
      });
    }

    console.log(this);
    this.contentBuilt = true;
  }

  onActivate() {
    console.log(this);

    if (this.debug) {
      console.log('Activating route ...');
    }

    this.basicScrolls = [...this.shadowRoot.querySelectorAll('c-scale-section'), ...this.shadowRoot.querySelectorAll('c-fade-transition'), ...this.shadowRoot.querySelectorAll('c-hero-frame'), ...this.shadowRoot.querySelectorAll('c-reveal-section'), ...this.shadowRoot.querySelectorAll('c-drive-in')];

    if (this.basicScrolls && this.basicScrolls.length) {
      this.basicScrolls.forEach(el => {
        if (el.scrollInstances && el.scrollInstances.length) {
          el.scrollInstances.forEach(i => {
            i.start();
          });
        }
      });
    }

    if (this.hasBooster) {
      let setup = () => {
        this.galleries = [...this.shadowRoot.querySelectorAll('c-gallery')];

        if (this.galleries[0] !== null && this.galleries[0] !== undefined) {
          // console.log(this.galleries[0])
          this.galleries.forEach(el => {
            el.scrollerStart();
          });
        } else {
          setTimeout(() => {
            setup();
          }, 2000);
        }
      };

      setup();
    }
  }

  onDeactivate() {
    if (this.debug) {
      console.log('Activating route ...');
    }

    this.basicScrolls = [...this.shadowRoot.querySelectorAll('c-scale-section'), ...this.shadowRoot.querySelectorAll('c-fade-transition'), ...this.shadowRoot.querySelectorAll('c-hero-frame'), ...this.shadowRoot.querySelectorAll('c-reveal-section'), ...this.shadowRoot.querySelectorAll('c-drive-in')];
    this.galleries = [...this.shadowRoot.querySelectorAll('c-gallery')];

    if (this.basicScrolls && this.basicScrolls.length) {
      this.basicScrolls.forEach(el => {
        if (el.scrollInstances && el.scrollInstances.length) {
          el.scrollInstances.forEach(i => {
            i.stop();
          });
        }
      });
    }

    if (this.galleries && this.galleries.length) {
      this.galleries.forEach(el => {
        el.scrollerStop();
      });
    }
  }

  async transitionIn() {
    if (!this.transitionReady) {
      await this.performUpdate();
      this.transitionReady = true;
    }
  }

}