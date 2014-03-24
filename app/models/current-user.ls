User = require './user'

module.exports = class CurrentUser extends User
	url-key: ''
	url-path: -> "users/"
	force-ext: false