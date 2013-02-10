Collection = require 'models/base/collection'
Topic = require 'models/topic'
View = require 'views/base/view'
TopicsListView = require 'views/topics/list-view'
template = require './templates/show'
TopicsFormNewView = require 'views/topics/form-new-view'

module.exports = class ForumsShowView extends View
  template: template
  container: '#page-container'
  class-name: 'forums-show'
  auto-render: true

  bindings:
    '#name':
      observe: 'name'
      on-get: 'formatName'

  events:
    'click .new-topic': 'showTopicForm'

  format-name: ->
    jade.helpers.titleize it

  render: ->
    super ...

    @topics = new Collection null,
      model: Topic
      url: @model.url '/topics'
    @topics.fetch!

    @subview 'topics' new TopicsListView do
      collection: @topics
      container: @$ '#topics'

    @create-new-topic-view!

  create-new-topic-view: !->
    topic = new Topic forum: @model
    container = @$ '.new-topic-form-container'
    container.hide!
    formView = new TopicsFormNewView {model: topic, container}

    @subview 'new-topic-form' formView

  show-topic-form: !->
    @$ '.new-topic-form-container' .show!
    @$ '.new-topic' .hide!