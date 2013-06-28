View = require 'views/base/view'
template = require './templates/item'
utils = require 'lib/utils'

module.exports = class ForumItemView extends View
  template: template
  tag-name: 'div'

  bindings:
    '.author-link':
      observe: 'author'
      update-method: 'html'
      on-get: ({id, name}) -> "<a href='#{url 'user#show' {id}}'>#name</a>"
    '.content': 'content'