Collection = require 'models/base/collection'
Topic = require 'models/topic'
View = require 'views/base/view'
TopicsListView = require 'views/topics/list-view'
template = require './templates/show'
itemView = require 'views/topics/item-view'

module.exports = class ForumsShowView extends View
  template: template
  container: '#page-container'
  class-name: 'home-page'
  auto-render: true

  after-render: ->
    super ...
    @topics = new Collection null, model: Topic
    #@topics.url = @model.url '/topics/'
    @topics.add id: 3 title: "Hey there"
    @subview 'topics' new TopicsListView do
      collection: @topics
      container: @$ '#topics'