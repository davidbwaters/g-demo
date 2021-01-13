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
  name: 'gallery',
  pattern: 'gallery',
  component: 'c-gallery-page',
  navTitle: 'Gallery',
  navLink: '/gallery'
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