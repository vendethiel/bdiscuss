Model = require './base/model'

module.exports = class User extends Model
	url-path: -> "users/"