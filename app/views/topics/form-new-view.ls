Message = require 'models/message'
FormView = require 'views/base/form-view'
template = require './templates/form-new'

module.exports = class TopicFormNewView extends FormView
  template: template
  class-name: 'new-topic-form'
  save-event: 'topic:new'

  events:
    # events are not inherited currently because
    # chaplin searches for coffee's __super__ whereas coco/ls uses superclass
    'click .new-topic': 'toggleFields'
    'click legend': 'toggleFields'

  bindings:
    '.title': 'title'
  message-bindings:
    '.content': 'content'

  initialize: ->
    super ...
    @message = new Message topic: @model
    @stickit @message, @message-bindings

  toggleFields: ~>
    @$ '.new-topic' .toggleClass 'active'
    @$ '.fields' .toggleClass 'active'
    false

  dispose: ->
    return if @disposed
    @message.dispose!
    delete @message
    super!