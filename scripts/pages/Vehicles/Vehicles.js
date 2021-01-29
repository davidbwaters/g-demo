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
          font-size: var(--text-size-small);
          padding: .5rem;
          position: fixed;
          text-align: center;
          width: 100%;
          z-index: 9;
        }

        .c-vehicles-page__nav a {
          display: inline-block;
          padding-right: calc(.075rem + 1vw);
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
    this.navSections = [];
    this.sectionIds.forEach(i => {
      this.navSections = this.navSections.concat(this.shadowRoot.getElementById(i.id));
    });
    this.navSectionLinks = this.shadowRoot.querySelectorAll('data-nav-target');
    this.navSections = [];
    this.sectionIds.forEach(i => {
      this.navSections = this.navSections.concat(this.shadowRoot.getElementById(i.id));
    });
    this.navSectionLinks = this.shadowRoot.querySelectorAll('data-nav-target'); //this.scrollSetup()
    //this.observer.observe(this.navSections)
  }

  scrollSetup(y) {}

  async transitionIn() {
    super.transitionIn();
    this.shadowRoot.querySelector('c-hero-frame').blurAnimation();
  }

  handleClick(e) {
    let id = e.target.dataset.navTarget;
    this.shadowRoot.getElementById(id).scrollIntoView();
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
            >
              ${i.title}
            </a>
          `)}
        </nav>
      `, ...this.content];
  }

}