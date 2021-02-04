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
          background-color: rgba(255,255,255,.85);
          border-bottom: 1px solid rgba(0,0,0,0.2);
          color: var(--color-fg-subtle);
          font-size: calc( var(--text-size-small) * .85);
          padding-bottom: .8rem;
          padding-left: .25rem;
          padding-right: .25rem;
          padding-top: .8rem;
          position: fixed;
          text-align: center;
          width: 100%;
          backdrop-filter: saturate(180%) blur(20px);
          z-index: 9;
        }

        @media(min-width: 70em) {

          .c-vehicles-page__nav {
            font-size: calc( var(--text-size-small) * 1);
            padding-bottom: .5rem;
            padding-top: .5rem;
          }

        }

        .c-vehicles-page__nav a {
          display: inline-block;
          opacity: .8;
          padding-left: calc(1.05vw);
          padding-right: calc(1.05vw);
        }

        .c-vehicles-page__nav a.is-active {
          color: var(--color-fg-contrast);
          opacity: 1;
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
    this.debug = false;
    this.sectionIds = [{
      title: 'Intro',
      id: 30
    }, {
      title: 'Exterior',
      id: 32
    }, {
      title: 'Interior',
      id: 6
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
    this.checkLoaded();
  }

  checkLoaded() {
    this.scrollDataSetup();

    if (this.navSections[0] === null) {
      //console.log(this.navSections[0])
      setTimeout(() => {
        this.checkLoaded();
      }, 4000);
    } else {
      //console.log(this.navSections[0])
      this.scrollSetup();
      this.navSections.forEach(s => {
        this.observer.observe(s);
      });
    }
  }

  scrollDataSetup() {
    this.navSections = [];
    this.sectionIds.forEach(i => {
      this.navSections = this.navSections.concat(this.shadowRoot.getElementById(i.id));
    });
    this.navSectionLinks = this.shadowRoot.querySelectorAll('data-nav-target');
    this.navSections = [];
    this.sectionIds.forEach(i => {
      this.navSections = this.navSections.concat(this.shadowRoot.getElementById(i.id));
    });
    this.navSectionLinks = this.shadowRoot.querySelectorAll('[data-nav-target]');
  }

  scrollSetup(y) {
    this.observer = new IntersectionObserver((entries, observer) => {
      let links = this.navSectionLinks;
      let id;
      entries.forEach(entry => {
        id = entry.target.id;

        if (entry.isIntersecting) {
          this.currentNav = id;
        }
      });
      links.forEach(link => {
        if (link.dataset.navTarget === id) {
          if (!link.classList.contains('is-active')) {
            link.classList.add('is-active');
          }
        } else {
          if (link.classList.contains('is-active')) {
            link.classList.remove('is-active');
          }
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '200px 0px -200px 0px'
    });
  }

  handleClick(e) {
    let id = e.target.dataset.navTarget;
    this.shadowRoot.getElementById(id).scrollIntoView();
  }

  async performUpdate() {
    super.performUpdate();
  }

  async preload() {
    super.buildComponents();
    await this.imagePreloader([this.data.Content[0].Image.url]);
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