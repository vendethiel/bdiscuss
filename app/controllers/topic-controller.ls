Controller = require 'controllers/base/controller'
TopicShowView = require 'views/topics/show-view'
Topic = require 'models/topic'

module.exports = class TopicController extends Controller
  historyURL: 'topics'
  title: 'topics'


  show: !({id}) ->
    @model = new Topic {id}
    @model.fetch!
    @view = new TopicShowView {@model}