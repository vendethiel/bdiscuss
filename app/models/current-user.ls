User = require './user'

module.exports = class CurrentUser extends User
	url-key: ''
	### HACK HACK HACK ###
	url-path: -> "users/#{local-storage.user-id}"