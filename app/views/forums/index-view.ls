CollectionView = require 'views/base/collection-view'
item-view = require './item-view'
template = require './templates/index'

module.exports = class ForumIndexView extends CollectionView
  template: template
  item-view: item-view
  class-name: 'forum-index'
  container: 'content'
  list-selector: '.forum-list'
  region: 'content'