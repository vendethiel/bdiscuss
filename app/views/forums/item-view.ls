View = require 'views/base/view'
template = require './templates/item'

module.exports = class ForumItemView extends View
  template: template
  tag-name: 'li'
  auto-render: true

  bindings:
    '.name':
      observe: 'name'
      on-get: 'formatName'

  format-name: jade.helpers.titleize