require! <[views/base/view views/templates/header]>

module.exports = class HeaderView extends view
  autoRender: yes
  className: 'header'
  container: '#header-container'
  id: 'header'
  template: header