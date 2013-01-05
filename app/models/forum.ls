Model = require './base/model'

module.exports = class Forum extends Model
  fetch: ->
    @set name: "Heya"