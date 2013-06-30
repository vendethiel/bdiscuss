Model = require './base/model'
Collection = require './base/collection'
Topic = require './topic'

module.exports = class Forum extends Model
  url-path: -> "forums/"

  parse: ->
    return @previousAttributes unless it?
    topics = new Collection it.topics, model: Topic
    
    it <<< {topics}