Message = require 'models/message'
FormView = require 'views/base/form-view'
template = require './templates/form-new'

module.exports = class TopicFormNewView extends FormView
  template: template
  class-name: 'new-topic-form'
  save-event: 'topic:new'

  events:
    'click .new-topic': 'toggleFields'
    'click legend': 'toggleFields'

  bindings:
    '.title': 'title'
  message-bindings:
    '.content': 'content'

  initialize: ->
    super ...
    # message model + bindings
    @message = new Message topic: @model
    @stickit @message, @message-bindings

  toggleFields: ~>
    @$ '.new-topic' .toggleClass 'active'
    @$ '.fields' .toggleClass 'active'
    false

  dismiss: !->
    @$.remove!
    @dispose!

  save: !->
    topic <~ @model.save!then
    <~ @message.save!then
    @publish-save topic
    @dismiss!

  dispose: ->
    return if @disposed
    @message.dispose!
    delete @message
    super!