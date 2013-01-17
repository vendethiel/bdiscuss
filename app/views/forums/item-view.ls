View = require 'views/base/view'
template = require './templates/item'

module.exports = class ForumsItemView extends View
  template: template
  tagname: 'li'
  autoRender: true

  bindings:
    '.name':
      observe: 'name'
      on-get: 'formatName'

  format-name: ->
    jade.helpers.titleize it