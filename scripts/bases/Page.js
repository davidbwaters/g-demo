/*
 *  Scripts - Bases - Page
 */

/* Page base class */
import { Component } from './Component.js';
import { buildComponent } from '../utils/buildComponent.js';
import { initialize } from '../styles/initialize.js';
import { objects } from '../styles/objects.js';
import { utilities } from '../styles/utilities.js';
import { observeElementInViewport } from '../../modules/observe-element-in-viewport.js';
export class Page extends Component {
  static get styles() {
    return [initialize, objects, utilities];
  }

  constructor() {
    super();
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePreload = this.handlePreload.bind(this);
    this.addEventListener('dataLoad', this.handleDataLoad);
    this.addEventListener('preload', this.handlePreload);
    this.buildComponent = buildComponent;
    this.content = []; // this.debug = true
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
      this.loaded = true;
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

  handleLoad() {
    this.transitionIn();
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  addBlurFilter() {
    super.addBlurFilter();
  }

  blurAnimation() {
    super.blurAnimation();
  }

  async performUpdate() {
    this.data = await this.getApiData(this.dataEndpoint);
    this.removeAttribute('data');
    this.dispatchEvent(new CustomEvent('dataLoad'));
    super.performUpdate();
  }

  buildComponents() {
    if (!this.contentBuilt) {
      this.data.Content.forEach(i => {
        this.content = this.content.concat(buildComponent(i, this.data, this.url));
      });
    }

    this.contentBuilt = true;
  }

  observeComponents(viewport, inHandler, outHandler, targetEls) {
    let targets = targetEls ? targetEls : this.shadowRoot.querySelectorAll('[data-id]');
    let observers = [];
    targets.forEach(target => {
      console.log(target);
      observers = observers.concat(observeElementInViewport(target, inHandler, outHandler, {
        viewport,
        modTop: '-100px',
        threshold: [90]
      }));
    });
    this.observers = observers;

    this.unobserveAll = () => {
      observers.forEach(o => {
        o();
      });
    };
  }

  onActivate() {
    if (this.debug) {
      console.log('Activating route ...');
    }

    this.basicScrolls = [...this.shadowRoot.querySelectorAll('c-scale-section'), ...this.shadowRoot.querySelectorAll('c-fade-transition'), ...this.shadowRoot.querySelectorAll('c-hero-frame'), ...this.shadowRoot.querySelectorAll('c-reveal-section'), ...this.shadowRoot.querySelectorAll('c-drive-in')];
    this.galleries = [...this.shadowRoot.querySelectorAll('c-gallery')];

    if (this.basicScrolls && this.basicScrolls.length) {
      this.basicScrolls.forEach(el => {
        if (el.scrollInstances && el.scrollInstances.length) {
          el.scrollInstances.forEach(i => {
            i.start();
          });
        }
      });
    }

    if (this.galleries && this.galleries.length) {
      this.galleries.forEach(el => {
        el.scrollerStart();
      });
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

  async preload() {}

}