/*
 *  Scripts - App
 */
import '../../modules/intersection-observer.js';
import '../../modules/construct-style-sheets-polyfill.js';
import { html, render } from '../../modules/lit-html.js';
import '../../modules/@appnest/masonry-layout.js';
import { Router } from '../router/Router.js';
import { RouterLink } from '../router/Link.js';
import { NavMenu } from '../components/NavMenu/NavMenu.js';
import { HomePage } from '../pages/Home/Home.js';
import { ContactPage } from '../pages/Contact/Contact.js';
import { GalleryPage } from '../pages/Gallery/Gallery.js';
import { MediaPage } from '../pages/Media/Media.js';
import { StoryPage } from '../pages/Story/Story.js';
import { VehiclesPage } from '../pages/Vehicles/Vehicles.js';
import { AngleBackground } from '../components/AngleBackground/AngleBackground.js';
import { BlockSection } from '../components/BlockSection/BlockSection.js';
import { ContactForm } from '../components/ContactForm/ContactForm.js';
import { Details } from '../components/Details/Details.js';
import { DriveIn } from '../components/DriveIn/DriveIn.js';
import { FadeTransition } from '../components/FadeTransition/FadeTransition.js';
import { Footer } from '../components/Footer/Footer.js';
import { Heading } from '../components/Heading/Heading.js';
import { Icon } from '../components/Icon/Icon.js';
import { Gallery } from '../components/Gallery/Gallery.js';
import { HeroFrame } from '../components/HeroFrame/HeroFrame.js';
import { HeroMultiHeading } from '../components/HeroMultiHeading/HeroMultiHeading.js';
import { Loader } from '../components/Loader/Loader.js';
import { RevealSection } from '../components/RevealSection/RevealSection.js';
import { ScaleSection } from '../components/ScaleSection/ScaleSection.js';
import { SlantTitle } from '../components/SlantTitle/SlantTitle.js';
import { SpecList } from '../components/SpecList/SpecList.js';
import { TextBlock } from '../components/TextBlock/TextBlock.js';
/*
window.addEventListener('scroll', function() {

  localStorage.setItem('scrollPosition', window.scrollY)

}, false)

window.addEventListener('load', function() {

  console.log(localStorage.getItem('scrollPosition'))
  if (localStorage.getItem('scrollPosition') !== null) {

    setTimeout(() => {

      window.scrollTo(
        0, localStorage.getItem('scrollPosition')
      )

    }, 2000)

  }

}, false)
*/

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
customElements.define('c-angle-background', AngleBackground);
customElements.define('c-block-section', BlockSection);
customElements.define('c-contact-form', ContactForm);
customElements.define('c-details', Details);
customElements.define('c-drive-in', DriveIn);
customElements.define('c-fade-transition', FadeTransition);
customElements.define('c-gallery', Gallery);
customElements.define('c-heading', Heading);
customElements.define('c-hero-frame', HeroFrame);
customElements.define('c-hero-multi-heading', HeroMultiHeading);
customElements.define('c-icon', Icon);
customElements.define('c-loader', Loader);
customElements.define('c-reveal-section', RevealSection);
customElements.define('c-scale-section', ScaleSection);
customElements.define('c-slant-title', SlantTitle);
customElements.define('c-speclist', SpecList);
customElements.define('c-text-block', TextBlock);
render(html`
    <c-router-app></c-router-app>
  `, document.body);
const cl = ['background: #fff', 'border-bottom: solid 1px black', 'border-left: solid 1px black', 'border-top: solid 1px black', 'color: #666', 'line-height: 35px', 'padding: 10px 0px 10px 10px'].join(';');
const clh = ['background: #fff', 'border-bottom: solid 1px black', 'border-right: solid 1px black', 'border-top: solid 1px black', 'color: red', 'line-height: 35px', 'padding: 10px 20px 10px 0'].join(';');
console.log('%c Coded with %c ♥️', cl, clh);