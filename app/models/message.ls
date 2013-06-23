Model = require './base/model'

module.exports = class Message extends Model
  url-path: -> throw new Error "should not reach"