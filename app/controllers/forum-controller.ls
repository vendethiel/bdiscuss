Controller = require 'controllers/base/controller'
ForumIndexView = require 'views/forums/index-view'
ForumShowView = require 'views/forums/show-view'
TopicListView = require 'views/topics/list-view'
Collection = require 'models/base/collection'
Forum = require 'models/forum'

module.exports = class ForumController extends Controller
  historyURL: 'forums'
  title: 'Forums'

  index: !->
    @collection = new Collection url: 'topics' model: Forum 
    @view = new ForumIndexView {@collection}
    @collection.fetch!

  show: !({id}) ->
    @model = new Forum {id}
    @view = new ForumShowView {@model}
    <~! @model.fetch!then

    @topicsView = new TopicListView do
      collection: @model.get 'topics'
      region: 'topic-list'
    @topicsView.render!