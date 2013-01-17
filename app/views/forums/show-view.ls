Collection = require 'models/base/collection'
Topic = require 'models/topic'
View = require 'views/base/view'
TopicsListView = require 'views/topics/list-view'
template = require './templates/show'
itemView = require 'views/topics/item-view'

module.exports = class ForumsShowView extends View
  template: template
  container: '#page-container'
  class-name: 'forums-show'
  auto-render: true

  bindings:
    '#name':
      observe: 'name'
      on-get: 'formatName'

  format-name: ->
    jade.helpers.titleize it

  after-render: ->
    super ...

    @topics = new Collection null,
      model: Topic
      url: @model.url '/topics'
    @topics.fetch!

    @subview 'topics' new TopicsListView do
      collection: @topics
      container: @$ '#topics'