/*
 *  Scripts - App
 */
import { html, render } from '../../modules/lit-html.js';
import { Router } from '../router/Router.js';
import { RouterLink } from '../router/Link.js';
import { HomePage } from '../pages/Home/Home.js';
import { ContactPage } from '../pages/Contact/Contact.js';
import { NavMenu } from '../components/NavMenu/NavMenu.js';
import { AngleSection } from '../components/AngleSection/AngleSection.js';
import { ScaleSection } from '../components/ScaleSection/ScaleSection.js';
import { SlantTitle } from '../components/SlantTitle/SlantTitle.js';
import { MotionBlur } from '../components/MotionBlur/MotionBlur.js';
import { FadeTransition } from '../components/FadeTransition/FadeTransition.js';
import { Loader } from '../components/Loader/Loader.js';
import { Details } from '../components/Details/Details.js';
import { Heading } from '../components/Heading/Heading.js';
import { HeadingSection } from '../components/HeadingSection/HeadingSection.js';
import { TextBlock } from '../components/TextBlock/TextBlock.js';
import { RevealSection } from '../components/RevealSection/RevealSection.js';
import { ContactForm } from '../components/ContactForm/ContactForm.js';
customElements.define('c-router-app', Router);
customElements.define('c-router-link', RouterLink);
customElements.define('c-home-page', HomePage);
customElements.define('c-contact-page', ContactPage);
customElements.define('c-nav-menu', NavMenu);
customElements.define('c-angle-section', AngleSection);
customElements.define('c-slant-title', SlantTitle);
customElements.define('c-motion-blur', MotionBlur);
customElements.define('c-heading', Heading);
customElements.define('c-heading-section', HeadingSection);
customElements.define('c-text-block', TextBlock);
customElements.define('c-scale-section', ScaleSection);
customElements.define('c-fade-transition', FadeTransition);
customElements.define('c-loader', Loader);
customElements.define('c-details', Details);
customElements.define('c-reveal-section', RevealSection);
customElements.define('c-contact-form', ContactForm);
render(html`
    <c-router-app></c-router-app>
  `, document.body);