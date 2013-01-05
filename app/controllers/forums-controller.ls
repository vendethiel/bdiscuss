Controller = require 'controllers/base/controller'
ForumsIndexView = require 'views/forums/index-view'
ForumsShowView = require 'views/forums/show-view'
ForumCollection = require 'models/forum-collection'
Forum = require 'models/forum'

module.exports = class ForumsController extends Controller
  historyURL: 'forums'
  title: 'Forums'

  index: ->
    @collection = new ForumCollection
    @view = new ForumsIndexView {@collection}
    @collection.fetch!

  show: ({id}) ->
    @model = new Forum {id}
    @model.fetch!
    @view = new ForumsShowView {@model}