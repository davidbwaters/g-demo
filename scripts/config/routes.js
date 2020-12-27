/*
 *  Scripts - Config - Routes
 */
export default [{
  name: 'home',
  pattern: '',
  data: {
    title: 'Home'
  },
  component: 'home-page'
}, {
  name: 'contact',
  pattern: 'contact',
  component: 'contact-page',
  navTitle: 'Contact',
  navLink: '/contact'
}];