require! mediator

jade.helpers =
  titleize: ->
    return "" unless it
    it = it.0.to-upper-case! + it.slice 1
    it .= replace "_" " "
    it.replace /\s([a-z])/ -> " #{it.1.to-upper-case!}"

  current-user: ->
    mediator.user

  is-admin: ->
    mediator.user?get 'admin'