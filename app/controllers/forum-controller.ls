Controller = require 'controllers/base/controller'
ForumIndexView = require 'views/forums/index-view'
ForumShowView = require 'views/forums/show-view'
ForumCollection = require 'models/forum-collection'
Forum = require 'models/forum'

module.exports = class ForumController extends Controller
  historyURL: 'forums'
  title: 'Forums'

  index: ->
    @collection = new ForumCollection
    @view = new ForumIndexView {@collection}
    @collection.fetch!

  show: ({id}) ->
    @model = new Forum {id}
    @view = new ForumShowView {@model}
    @model.fetch!