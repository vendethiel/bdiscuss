View = require 'views/base/view'
template = require './templates/item'

module.exports = class TopicsItemView extends View
  template: template
  tagname: 'li'
  autoRender: true

  bindings:
    '.title': 'title'
    '.lock-state':
      observe: 'locked'
      on-get: ->
        if it
          ' (locked)'
        else ''