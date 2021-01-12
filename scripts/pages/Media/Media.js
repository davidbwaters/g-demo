/*
 *  Scripts - Pages - Media
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
import { generic } from '../../styles/generic.js';
export class MediaPage extends LitElement {
  static get styles() {
    return [generic, css`
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
        type: Object
      },
      loaded: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.url = 'https://admin.guntherwerks.info';
    this.handleLoad = this.handleLoad.bind(this);
  }

  firstUpdated() {}

  preload() {
    if (!this.data) {
      setTimeout(() => {
        this.preload();
      }, 200);
    } else {
      this.loaded = true;
    }
  }

  handleLoad() {
    if (this.loaded === true) {
      this._transitionIn();

      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
    } else {
      setTimeout(() => {
        this.handleLoad();
      }, 50);
    }
  }

  _transitionIn() {}

  async _getData() {
    const response = await fetch(this.url + '/contact').then(res => res.json()).catch(err => console.error(err));
    return {
      statusCode: 200,
      body: response
    };
  }

  async performUpdate() {
    const data = await this._getData(data => {
      this.data = data;
    });
    this.data = data.body; // console.log(this.data)

    super.performUpdate();
  }

  render() {
    return html` <div>
      <h1>Media</h1>
    </div>`;
  }

}