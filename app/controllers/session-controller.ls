mediator = require 'mediator'
Controller = require './base/controller'
User = require 'models/User'
LoginView = require 'views/LoginView'
#provider = require 'provider'

module.exports = class SessionController extends Controller
#  service-provider: new 

  initialize: ->
    @subscribe-event 'login' @login
    @subscribe-event 'logout' @logout

    @subscribe-event '!login' @trigger-login
    @subscribe-event '!logout' @trigger-logout

    @load!

  load: ->
  	@load-providers!

  load-providers: ->
    provider.load!

  show-login-view: ->
    return if @login-view
    @load-providers!

    @login-view = new LoginView

  instantiate-account: ->
    mediator.user = new User it

  trigger-login: ->
    