Model = require './base/model'
User = require './user'

module.exports = class Message extends Model
  url-path: -> "messages/"

  parse: ->
    return @previousAttributes unless it?
    user = new Collection it.user, model: User

    it <<< {user}