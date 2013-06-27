View = require 'views/base/view'
template = require './templates/item'
utils = require 'lib/utils'

module.exports = class ForumItemView extends View
  template: template
  tag-name: 'li'

  bindings:
    '.name':
      observe: 'name'
      on-get: 'formatName'

  format-name: utils.titleize