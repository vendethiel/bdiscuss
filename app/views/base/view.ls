Chaplin = require 'chaplin'

module.exports = class View extends Chaplin.View
  # Precompiled templates function initializer.
  getTemplateFunction: ->
    @template

  getTemplateData: ->
    _.extend {}, jade.helpers, super ...


  render: ->
    super ...
    @stickit!

/*
  initialize: ->
    super ...
    modelOrCollection = @model or @collection
    if modelOrCollection
      rendered = no
      @listenTo modelOrCollection, 'change', ~>
        @render! unless rendered
        rendered = yes
*/