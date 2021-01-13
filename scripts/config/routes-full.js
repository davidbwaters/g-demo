/*
 *  Scripts - Config - Routes
 */
export default [{
  name: 'home',
  pattern: '',
  data: {
    title: 'Home'
  },
  component: 'c-home-page'
}, {
  name: 'contact',
  pattern: 'contact',
  component: 'c-contact-page',
  navTitle: 'Contact',
  navLink: '/contact'
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
  name: 'story',
  pattern: 'story',
  component: 'c-story-page',
  navTitle: 'Story',
  navLink: '/story'
}, {
  name: 'vehicles',
  pattern: 'vehicles',
  component: 'c-vehicles-page',
  navTitle: 'Vehicles',
  navLink: '/vehicles'
}];