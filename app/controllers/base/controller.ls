Chaplin = require 'chaplin'
SiteView = require 'views/shared/site-view'
HeaderView = require 'views/shared/header-view'
UserNavView = require 'views/shared/user-nav-view'

module.exports = class Controller extends Chaplin.Controller
  before-action: (params, route) ->
    @compose 'site' SiteView
    @compose 'header' HeaderView
    @compose 'user-nav' UserNavView
    @compose 'auth' !->
      SessionController = require 'controllers/session-controller'
      @controller = new SessionController