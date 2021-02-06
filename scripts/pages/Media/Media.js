/*
 *  Scripts - Pages - Media
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
import { buttons } from '../../styles/components.buttons.js';
export class MediaPage extends Page {
  static get styles() {
    return [initialize, objects, utilities, buttons, css`
        :host {
          display: block;
          height: 100%;
          overflow-x: hidden;
          width: 100%;
        }

        .c-gallery-page__overlay {
          display: grid;
          align-content: center;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          justify-content: center;
          padding-top: 0rem;
          row-gap: 0rem;
        }

        .c-gallery-page__overlay-title {
          background-color: var(--color-bg-subtle);
          margin-bottom: 1rem;
          padding-bottom: 2rem;
          padding-left: 4rem;
          padding-right: 4rem;
          padding-top: 5rem;
          text-align: center;
        }

        .c-gallery-page__overlay-lower {
          align-content: center;
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: auto;
          padding-bottom: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 1rem;
          justify-content: center;
        }

        @media(min-width:40rem) {

          .c-gallery-page__overlay-lower {
            align-content: center;
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(
              auto
            );
          }

        }


      `];
  }

  static get properties() {
    return {
      data: {
        type: Object,
        attribute: false
      },
      contentData: {
        type: Object,
        attribute: false
      },
      debug: {
        type: Boolean,
        attribute: false
      },
      galleryItems: {
        type: Array
      },
      hideFooter: {
        type: Boolean
      },
      loaded: {
        type: Boolean,
        reflect: true
      },
      loadProgress: {
        type: Number,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.pageEndpoint = '/articles';
    this.dataEndpoint = '/media-entries';
    this.hideFooter = true;
    this.hasBooster = true; //this.debug = false
  }

  firstUpdated() {}

  async preload() {
    this.albumCovers = [];
    this.pageImages = [];
    this.thumbnails = [];
    this.galleryItems = [];
    this.pageData.Articles.forEach(item => {
      this.galleryItems = this.galleryItems.concat({
        id: item.Media.id,
        Cover: item.Media.Cover,
        Title: item.Media.Heading,
        Subtitle: item.Media.Subheading,
        EntryContent: this.contentData.filter(obj => {
          return obj.id === item.Media.id;
        })[0].EntryContent,
        ExternalLink: this.contentData.filter(obj => {
          return obj.id === item.Media.id;
        })[0].ExternalLink
      });

      if (item.Media.Cover) {
        this.albumCovers = this.albumCovers.concat(item.Media.Cover.url);
      }
    });
    await this.imagePreloader(this.albumCovers); // console.log(this.pageData)
    // console.log(this.galleryItems)
  }

  async preloadImages() {
    if (this.debug) {// console.log(this.albumCovers)
    }
  }

  transitionIn() {}

  async performUpdate() {
    this.pageData = await this.getApiData(this.pageEndpoint);
    this.contentData = await this.getApiData(this.dataEndpoint);
    await this.preload();
    this.dispatchEvent(new CustomEvent('dataLoad'), {
      bubbles: true,
      composed: true
    });
    super.performUpdate();
  }

  render() {
    return html`
      <section
        class="c-gallery-page__wrapper"
      >
        <c-gallery
          data=${JSON.stringify(this.galleryItems)}
          type='articles'
        >

          ${this.galleryItems.map(i => html`

            <div
              slot=${i.id}
              class="c-gallery-page__overlay"
            >
              ${this.buildComponent(i.EntryContent)}
              <div
                class="c-gallery-page__overlay-title"
              >
                <c-heading
                  data=${JSON.stringify({
      Text: i.Title
    })}
                  size="medium"
                >
                </c-heading>
              </div>
              <div
                class="c-gallery-page__content"
              >
              </div>

                ${i.EntryContent.map(j => {
      return this.buildComponent(j);
    })}

              <div
                class="c-gallery-page__overlay-lower"
              >
                ${i.ExternalLink ? html`
                    <a
                      class="
                        c-button
                        c-button--large
                        c-button--flush
                        c-button--block
                      "
                      href=${i.ExternalLink.URL}
                    >
                      ${i.ExternalLink.Text}
                    </a>
                  ` : html` `}
              </div>

              <div
                class="c-gallery-page__image-frame"
              >
              </div>

            </div>


          `)}

        </c-gallery>
      </section>

    `;
  }

}