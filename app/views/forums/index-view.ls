CollectionView = require 'views/base/collection-view'
ForumItemView = require './item-view'
template = require './templates/index'

module.exports = class ForumIndexView extends CollectionView
  template: template
  class-name: 'home-page'
  container: '#page-container'
  list-selector: '.forum-list'
  item-view: ForumItemView
  auto-render: true