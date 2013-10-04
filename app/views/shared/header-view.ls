require! <[views/base/view ./templates/header ./user-nav-view]>

module.exports = class HeaderView extends view
  template: header
  region: 'header'
  class-name: 'header'
  tag-name: 'header'

  regions:
    'user-nav': '#user-nav'

  #@subview 'user-nav' new userNavView do
  #container: @$ '#user-nav-container'