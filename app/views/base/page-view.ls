View = require 'views/base/view'

module.exports = class PageView extends View
  container: '#page-container'
  class-name: 'home-page'
  autoRender: true
  renderedSubviews: no

  initialize: ->
    super ...
    modelOrCollection = @model or @collection
    if modelOrCollection
      rendered = no
      @listenTo modelOrCollection, 'change', ~>
        @render! unless rendered
        rendered = yes

  getNavigationData: ->
    {}

  renderSubviews: ->
    return

  render: ->
    super ...
    unless @renderedSubviews
      @renderSubviews!
      @renderedSubviews = yes
    @publishEvent 'navigation:change' @getNavigationData!