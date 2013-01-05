Collection = require './base/collection'
model = require './forum'

module.exports = class ForumCollection extends Collection
  model: model


  fetch: ->
    @add id: 5 name: 'lol'
    @add id: 6 name: 'heya'