/*
 *  Scripts - Pages - Vehicles
 */
import { css, html } from '../../../modules/lit-element.js';
import { Page } from '../../bases/Page.js';
import { initialize } from '../../styles/initialize.js';
import { objects } from '../../styles/objects.js';
import { utilities } from '../../styles/utilities.js';
export class VehiclesPage extends Page {
  static get styles() {
    return [initialize, objects, utilities, css`
        .c-vehicles-page__nav {
          background-color: var(--color-bg);
          color: var(--color-fg-subtle);
          padding: .5rem;
          position: fixed;
          text-align: center;
          width: 100%;
          z-index: 9;
        }

        .c-vehicles-page__nav a {
          display: inline-block;
          padding-left: calc(.1rem + 1vw);
          padding-right: calc(.1rem + 1vw);
        }

        .c-vehicles-page__nav a.is-active {
          color: var(--color-fg-contrast);
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
        attribute: false
      },
      loadProgress: {
        type: Number,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    this.dataEndpoint = '/vehicle';
    this.debug = true;
    this.sectionIds = [{
      title: 'Intro',
      id: 30
    }, {
      title: 'Exterior',
      id: 32
    }, {
      title: 'Interior',
      id: 10
    }, {
      title: 'Engine',
      id: 7
    }, {
      title: 'Transmission',
      id: 8
    }, {
      title: 'Suspension',
      id: 9
    }, {
      title: 'Lighting',
      id: 36
    }, {
      title: 'Specs',
      id: 38
    }];
  }

  firstUpdated() {
    this.navSectionLinks = {};
    this.navSections = [];
    this.sectionIds.map(s => {
      let link = this.shadowRoot.querySelector('[data-nav-target="' + s.id + '"]');
      let section = this.shadowRoot.querySelector('[id="' + s.id + '"');
      this.navSectionLinks[s.id] = {};
      this.navSectionLinks[s.id].link = link;
      this.navSectionLinks[s.id].el = section;
      this.navSections = this.navSections.concat(section);
      console.log(this.navSectionLinks);
    });
    setTimeout(() => {}, 3000);
    this.setPositons();
    this.scrollSetup();
    this.navSections.forEach(s => {//this.observer.observe(s)
    });
  }

  setPositons() {
    this.sectionIds.map(s => {
      let link = this.shadowRoot.querySelector('[data-nav-target="' + s.id + '"]');
      let section = this.shadowRoot.querySelector('[id="' + s.id + '"');
      this.navSectionLinks[s.id] = {};
      this.navSectionLinks[s.id].section = section;
      this.navSectionLinks[s.id].link = link;
      this.navSectionLinks[s.id].pos = section.shadowRoot.host.getBoundingClientRect();
    });
  }

  scrollSetup(y) {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(entry);
          this.sectionIds.map(s => {
            if (!s.id === entry.id) {
              if (s.link.classList.contains('is-active')) {
                s.link.classList.remove('is-active');
              }
            }
          });

          if (!this.intersecting === entry.id) {
            this.navSectionLinks[entry.id].link.classList.add(['is-active']);
          }
        }
      });
    }, {
      threshold: 1
    });
  }

  async transitionIn() {
    super.transitionIn();
    this.shadowRoot.querySelector('c-hero-frame').blurAnimation();
  }

  handleClick(e) {
    let id = e.target.dataset.navTarget;
    this.navSectionLinks[id].section.scrollIntoView();
  }

  async performUpdate() {
    super.performUpdate();
    super.addBlurFilter();
  }

  async preload() {
    super.buildComponents();
    await this.imagePreloader([]);
  }

  render() {
    return [html`
        <nav class="c-vehicles-page__nav">
          ${this.sectionIds.map(i => html`
            <a
              href=${'#' + i.id}
              data-nav-target=${i.id}
              @click=${this.handleClick}
              class="u-text-title"
            >
              ${i.title}
            </a>
          `)}
        </nav>
      `, ...this.content];
  }

}