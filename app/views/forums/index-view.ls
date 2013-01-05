CollectionView = require 'views/base/collection-view'
ForumsItemView = require './item-view'
template = require './templates/index'

module.exports = class ForumsIndexView extends CollectionView
  template: template
  class-name: 'home-page'
  container: '#page-container'
  list-selector: '.forum-list'
  item-view: ForumsItemView
  auto-render: true