Controller = require 'controllers/base/controller'
ForumsIndexView = require 'views/forums/index-view'
ForumCollection = require 'models/forum-collection'

module.exports = class ForumsController extends Controller
  historyURL: 'forums'
  title: 'Forums'

  index: ->
    collection = new ForumCollection
    collection.add id: 5 name: 'lol'
    @view = new ForumsIndexView {collection}
    #collection.fetch! #FIXME