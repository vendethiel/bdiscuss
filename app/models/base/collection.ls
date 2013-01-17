Chaplin = require 'chaplin'
Model = require 'models/base/model'

module.exports = class Collection extends Chaplin.Collection
  model: Model

  initialize: (, options) ->
    super ...

    @url = that if options?url?