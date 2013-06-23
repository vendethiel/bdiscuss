Chaplin = require 'chaplin'
Model = require 'models/base/model'

module.exports = class Collection extends Chaplin.Collection
  model: Model
  ::{force-ext, api-root, url, url-root, url-params} = Model::

  initialize: (, options) ->
    super ...

    @url = that if options?url?