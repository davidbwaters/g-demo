/*
 *  Scripts - Config - Routes
 */
export const routes = [{
  name: 'home',
  pattern: '',
  data: {
    title: 'Home'
  },
  component: 'c-home-page'
}, {
  name: 'vehicles',
  pattern: 'vehicles',
  component: 'c-vehicles-page',
  navTitle: 'Vehicles',
  navLink: '/vehicles'
}, {
  name: 'story',
  pattern: 'story',
  component: 'c-story-page',
  navTitle: 'Story',
  navLink: '/story'
}, {
  name: 'gallery',
  pattern: 'gallery',
  component: 'c-gallery-page',
  navTitle: 'Gallery',
  navLink: '/gallery'
}, {
  name: 'media',
  pattern: 'media',
  component: 'c-media-page',
  navTitle: 'Media',
  navLink: '/media'
}, {
  name: 'contact',
  pattern: 'contact',
  component: 'c-contact-page',
  navTitle: 'Contact',
  navLink: '/contact'
}];