View = require 'views/base/view'
template = require './templates/item'

module.exports = class ForumItemView extends View
  template: template
  tag-name: 'div'
  auto-render: 'true'

  bindings:
    '.author-link':
      observe: 'author'
      update-method: 'html'
      on-get: ({id, name}) -> "<a href='/user/#id'>#name</a>"
    '.content': 'content'