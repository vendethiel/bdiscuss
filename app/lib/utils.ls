Chaplin = require 'chaplin'
mediator = require 'mediator'

# Application-specific utilities
# ------------------------------

# Delegate to Chaplin’s utils module
utils = Chaplin.utils.beget Chaplin.utils

_ utils .extend do
  titleize: ->
    return "" unless it
    it = it.0.to-upper-case! + it.slice 1
    it .= replace "_" " "
    it.replace /\s([a-z])/ -> " #{it.1.to-upper-case!}"

  current-user: ->
    mediator.user

  is-admin: ->
    mediator.user?get 'admin'

module.exports = utils