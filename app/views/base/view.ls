utils = require 'lib/utils'

module.exports = class View extends Chaplin.View
  auto-render: true

  # Precompiled templates function initializer.
  getTemplateFunction: ->
    @template

  getTemplateData: ->
    utils.beget(utils) <<<< super!

  render: ->
    super ...
    @stickit! if @model