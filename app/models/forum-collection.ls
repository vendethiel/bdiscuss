Collection = require './base/collection'
model = require './forum'

module.exports = class ForumCollection extends Collection
  model: model

  url: -> "/forums.json"