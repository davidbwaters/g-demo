/*
 *  Scripts - Pages - Story
 */
import { LitElement, css, html } from '../../../modules/lit-element.js';
import { generic } from '../../styles/generic.js';
export class StoryPage extends LitElement {
  static get styles() {
    return [generic, css`
        :host {
          display: block;
          height: 100%;
          width: 100%;
        }
        section {
          padding-bottom: 4rem;
          padding-top: 4rem;
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
  }

  firstUpdated() {
    this.handleLoad = this.handleLoad.bind(this);
  }

  preload() {
    if (!this.data) {
      console.log(this.data);
      setTimeout(() => {
        this.preload();
      }, 500);
    } else {
      this.loaded = true;
    }
  }

  handleLoad() {
    console.log('Handle load ...');

    if (this.loaded === true) {
      this._transitionIn();

      let load = new CustomEvent('routeLoad');
      this.dispatchEvent(load);
      console.log('Route loaded ...');
    } else {
      setTimeout(() => {
        this.handleLoad();
      }, 500);
    }
  }

  _transitionIn() {}

  async _getData() {
    const response = await fetch(this.url + '/story').then(res => res.json()).catch(err => console.error(err));
    return {
      statusCode: 200,
      body: response
    };
  }

  async performUpdate() {
    const data = await this._getData(data => {
      this.data = data;
    });
    this.data = data.body;
    console.log(this.data);
    super.performUpdate();
  }

  render() {
    return html`
      <section
        class="
          c-story__main-section
        "
      >
        <h1
          class="
            c-story__main-heading
          "
        >
          ${this.data.MainHeadingSmallPart}
          <span>
            ${this.data.MainHeadingLargePart}
          </span>
        </h1>
        <div class="
          c-story__main-image-wrapper"
        >
          <img
            class="
              c-story__main-image
            "
            src = ${this.url + this.data.MainImage.url}
            alt=${this.data.MainImage.alternativeText}
          >
        </div>

      </section>

    `;
  }

}