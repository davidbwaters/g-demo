/*
 *  Scripts - Pages - Story
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
import { heroFrame } from '../../styles/components.hero-frames.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class StoryPage extends Page {
  static get styles() {
    return [initialize, objects, heroFrame, utilities, css`
        :host {
          display: block;
          height: 100%;
          width: 100%;
        }
        .c-story__main {
          background-image: var(--story-main-background-image);
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          min-height: 100vh;
        }
        .c-story__main-heading {
          font-size: var(--text-size-heading-medium);
          line-height: var(--line-height-heading-medium);
          text-align: center;
        }
        .c-story__main-heading span {
          display: block;
          font-size: var(--text-size-heading-huge);
          line-height: var(--line-height-heading-huge)
        }
      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribute: false
      },
      loaded: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.dataEndpoint = '/story';
  }

  firstUpdated() {
    this.handleLoad = this.handleLoad.bind(this);
    this.shadowRoot.querySelector('.c-story__main').style.setProperty('--story-main-background-image', 'url(' + this.url + this.data.MainImage.url + ')');
  }

  render() {
    return html`
      <section
        class="
          c-story__main
          o-section-block
          o-section-block--top
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

      </div>
    </section>
    <c-block-section
      data=${JSON.stringify(this.data.BlockSections[0])}
    >
    </c-block-section>
    `;
  }

}