require! <[views/base/view ./templates/header ./user-nav-view]>

module.exports = class HeaderView extends view
  template: header
  className: 'header'
  container: '#header-container'
  id: 'header'
  tagName: 'header'

  render: ->
    super!
    @subview 'user-nav' new userNavView do
      container: @$ '#user-nav-container'