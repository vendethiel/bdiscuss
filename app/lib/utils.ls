# Delegate to Chaplin’s utils module
{mediator, utils, {reverse}: helpers} = Chaplin
utils .= beget utils

_ utils .extend do
  # lcfirst: (f, ...r) -> f.toUpperCase! + r * ''
  titleize: ->
    return "" unless it
    it = it.0.to-upper-case! + it.slice 1
    it .= replace "_" " "
    it.replace /\s([a-z])/ -> " #{it.1.to-upper-case!}"

  current-user: ->
    mediator.user

  is-admin: ->
    mediator.user?get 'admin'

  url: reverse

module.exports = utils