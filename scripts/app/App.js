/*
 *  Scripts - App
 */
import { html, render } from '../../modules/lit-html.js';
import { Router } from '../router/Router.js';
import { RouterLink } from '../router/Link.js';
import { HomePage } from '../pages/Home/Home.js';
import { ContactPage } from '../pages/Contact/Contact.js';
import { NavMenu } from '../components/NavMenu/NavMenu.js';
import { ProductFrames } from '../components/ProductFrames/ProductFrames.js';
import { SlantTitle } from '../components/SlantTitle/SlantTitle.js';
customElements.define('router-app', Router);
customElements.define('router-link', RouterLink);
customElements.define('home-page', HomePage);
customElements.define('contact-page', ContactPage);
customElements.define('nav-menu', NavMenu);
customElements.define('product-frames', ProductFrames);
customElements.define('slant-title', SlantTitle);
render(html`
    <nav-menu>
      <router-link
        class="c-logo-responsive c-logo-responsive--light"
        slot="branding"
      >

      </router-link>
    </nav-menu>
    <router-app></router-app>
  `, document.body);