Model = require './base/model'

module.exports = class Topic extends Model
  url-path: -> "topics/"

  /*
   * demo on how to have "nested models"
   * (in less that 54k lines of code /troll)
   * you need nested JSON, like that (here) :
   * {"title": "Hey mate!", "forum": {"id": 1, "name": "Mah forum"}}
  parse: ->
    # you need to return the root + other stuff
    Forum = require 'models/forum'
    forum = new Forum ^^it.forum
    it <<< {forum}
   */