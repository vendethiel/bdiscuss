CollectionView = require 'views/base/collection-view'
itemView = require './item-view'
template = require './templates/list'

module.exports = class TopicListView extends CollectionView
  template: template
  item-view: item-view
  list-selector: '.topic-list'