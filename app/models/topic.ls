Model = require './base/model'
Collection = require './base/collection'
Message = require './message'

module.exports = class Topic extends Model
  url-path: -> "topics/"

  parse: ->
    return @previousAttributes unless it?
    messages = new Collection it.messages, model: Message

    it <<< {messages}