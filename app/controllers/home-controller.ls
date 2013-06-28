Controller = require 'controllers/base/controller'
HomeShowView = require 'views/home/show-view'

module.exports = class HomeController extends Controller
  historyURL: 'home'
  title: 'Home'

  index: !->
    @view = new HomeShowView