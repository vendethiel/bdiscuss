require! <[views/base/view ./templates/header]>

module.exports = class HeaderView extends view
  autoRender: yes
  className: 'header'
  container: '#header-container'
  id: 'header'
  template: header