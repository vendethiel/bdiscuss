Controller = require 'controllers/base/controller'
TopicsShowView = require 'views/topics/show-view'
ForumCollection = require 'models/forum-collection'
Forum = require 'models/forum'

module.exports = class TopicsController extends Controller
  historyURL: 'topics'
  title: 'topics'


  show: ({id}) ->
    @model = new Topic {id}
    @model.fetch!
    @view = new TopicsShowView {@model}