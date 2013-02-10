mediator = require 'mediator'
Controller = require './base/controller'
User = require 'models/user'
#LoginView = require 'views/shared/login-view'
#provider = require 'provider'

module.exports = class SessionController extends Controller
  initialize: ->
    super ...
    return # for now
    @subscribe-event 'login' @login
    @subscribe-event 'logout' @logout

    @subscribe-event '!login' @trigger-login
    @subscribe-event '!logout' @trigger-logout

  show-login-view: ->
    return if @login-view
    @load-providers!

    @login-view = new LoginView

  instantiate-account: ->
    mediator.user = new User it

  trigger-login: ->
    