require! <[views/templates/home views/base/view]>

module.exports = class HomePageView extends view
  autoRender: yes
  className: 'home-page'
  container: '#page-container'
  template: home
