Collection = require 'models/base/collection'
Topic = require 'models/topic'
View = require 'views/base/view'
TopicListView = require 'views/topics/list-view'
template = require './templates/show'
TopicFormNewView = require 'views/topics/form-new-view'
utils = require 'lib/utils'

module.exports = class ForumShowView extends View
  template: template
  container: '#page-container'
  class-name: 'container'
  auto-render: true

  bindings:
    '#name':
      observe: 'name'
      on-get: 'formatName'

  events:
    'click .new-topic': 'showTopicForm'

  format-name: utils.titleize

  render: ->
    super ...

    @topics = new Collection null,
      model: Topic
      url: @model.url '/topics'
    @topics.fetch!

    @subview 'topics' new TopicListView do
      collection: @topics
      container: @$ '#topics'

    @create-new-topic-view!

  create-new-topic-view: !->
    topic = new Topic forum: @model
    @$ '.new-topic-form-container'
      ..hide!
      formView = new TopicFormNewView model: topic, container: ..

    @subview 'new-topic-form' formView

  show-topic-form: !->
    @$ '.new-topic-form-container' .show!
    @$ '.new-topic' .hide!