View = require 'views/base/view'
template = require './templates/item'

module.exports = class TopicsItemView extends View
  template: template
  tagname: 'li'
  autoRender: true

  events:
    'click .toggle-edit-title': 'toggleEditTitle'
    'blur .edit-title': 'toggleEditTitle'
    'keyup .edit-title': 'keyupEditTitle'

  bindings:
    '.title': 'title'
    '.lock-state':
      observe: 'locked'
      visible: false
    '.lock-toggle':
      observe: 'locked'
    '.edit-title':
      observe: 'title'

  toggle-edit-title: ->
    @saved-title = if (toggler = @$ '.toggle-edit-title')is ':visible'
      @model.get 'title' 
    else void #reset it

    toggler.toggle!
    @$ 'a.title' .toggle!
    @$ '.edit-title' .toggle!

    false

  keyup-edit-title: !({key-code}) ->
    switch key-code
    | 27 =>
      return unless @saved-title
      @model.set 'title' delete @saved-title
      fallthrough
    | 13 => @toggle-edit-title!