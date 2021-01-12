/*
 *  Scripts - App
 */
import '../../modules/construct-style-sheets-polyfill.js';
import { html, render } from '../../modules/lit-html.js';
import { Router } from '../router/Router.js';
import { RouterLink } from '../router/Link.js';
import { NavMenu } from '../components/NavMenu/NavMenu.js';
import { HomePage } from '../pages/Home/Home.js';
import { ContactPage } from '../pages/Contact/Contact.js';
import { GalleryPage } from '../pages/Gallery/Gallery.js';
import { MediaPage } from '../pages/Media/Media.js';
import { StoryPage } from '../pages/Story/Story.js';
import { VehiclesPage } from '../pages/Vehicles/Vehicles.js';
import { AngleSection } from '../components/AngleSection/AngleSection.js';
import { ContactForm } from '../components/ContactForm/ContactForm.js';
import { Details } from '../components/Details/Details.js';
import { FadeTransition } from '../components/FadeTransition/FadeTransition.js';
import { Footer } from '../components/Footer/Footer.js';
import { Heading } from '../components/Heading/Heading.js';
import { Gallery } from '../components/Gallery/Gallery.js';
import { HeadingSection } from '../components/HeadingSection/HeadingSection.js';
import { Loader } from '../components/Loader/Loader.js';
import { RevealSection } from '../components/RevealSection/RevealSection.js';
import { ScaleSection } from '../components/ScaleSection/ScaleSection.js';
import { SlantTitle } from '../components/SlantTitle/SlantTitle.js';
import { TextBlock } from '../components/TextBlock/TextBlock.js';
customElements.define('c-router-app', Router);
customElements.define('c-router-link', RouterLink);
customElements.define('c-nav-menu', NavMenu);
customElements.define('c-footer', Footer);
customElements.define('c-home-page', HomePage);
customElements.define('c-contact-page', ContactPage);
customElements.define('c-gallery-page', GalleryPage);
customElements.define('c-media-page', MediaPage);
customElements.define('c-story-page', StoryPage);
customElements.define('c-vehicles-page', VehiclesPage);
customElements.define('c-angle-section', AngleSection);
customElements.define('c-heading', Heading);
customElements.define('c-heading-section', HeadingSection);
customElements.define('c-contact-form', ContactForm);
customElements.define('c-details', Details);
customElements.define('c-fade-transition', FadeTransition);
customElements.define('c-gallery', Gallery);
customElements.define('c-loader', Loader);
customElements.define('c-reveal-section', RevealSection);
customElements.define('c-scale-section', ScaleSection);
customElements.define('c-slant-title', SlantTitle);
customElements.define('c-text-block', TextBlock);
render(html`
    <c-router-app></c-router-app>
  `, document.body);