View = require 'views/base/view'
template = require './templates/item'

module.exports = class TopicsItemView extends View
  template: template
  tagname: 'li'
  autoRender: true