Model = require 'models/base/model'

module.exports = class Collection extends Chaplin.Collection
  model: Model
  ::{force-ext, api-root} = Model::

  initialize: (, {@url}) ->
    @url = @api-root + @url
    if @force-ext
      @url += '.json'
    super ...