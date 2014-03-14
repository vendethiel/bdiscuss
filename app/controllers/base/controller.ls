SiteView = require 'views/shared/site-view'
HeaderView = require 'views/shared/header-view'
UserNavView = require 'views/shared/user-nav-view'

module.exports = class Controller extends Chaplin.Controller
  before-action: (params, route) ->
    @reuse 'site' SiteView
    @reuse 'header' HeaderView
    @reuse 'user-nav' UserNavView
    @reuse 'auth' !->
      SessionController = require 'controllers/session-controller'
      @controller = new SessionController