CurrentUser = require 'models/current-user'

mediator = module.exports = Chaplin.mediator

mediator.create-user = !->
	# TODO this currently could be depending on localStorage.user but it doesn't matter
	@user = new CurrentUser

mediator.remove-user = !->
	@user.dispose!
	@user = null