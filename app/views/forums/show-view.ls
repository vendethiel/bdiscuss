Collection = require 'models/base/collection'
Topic = require 'models/topic'
PageView = require 'views/base/page-view'
TopicListView = require 'views/topics/list-view'
TopicFormNewView = require 'views/topics/form-new-view'
template = require './templates/show'
utils = require 'lib/utils'

module.exports = class ForumShowView extends PageView
  template: template

  regions:
    'new-topic': '.new-topic-container'
    'topic-list': '.topic-list'

  bindings:
    '#name':
      observe: 'name'
      on-get: utils.titleize

  render: ->
    super ...
    @create-topic-form!

  create-topic-form: !->
    @topic?dispose!
    @topic = new Topic forum: @models
    @topicView = new TopicFormNewView region: 'new-topic' model: @topic