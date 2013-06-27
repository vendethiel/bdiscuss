Collection = require 'models/base/collection'
Message = require 'models/message'
View = require 'views/base/view'
template = require './templates/show'
MessageListView = require 'views/messages/list-view'

module.exports = class TopicShowView extends View
  template: template
  container: '#page-container'
  class-name: 'container'

  bindings:
    '#title': 'title'

  render: !->
    super ...

    @messages = @model.get 'messages'
    if @messages
      @subview 'messages' new MessageListView do
        collection: @messages
        container: @$ '#messages'