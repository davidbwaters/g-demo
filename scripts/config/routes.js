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
}];