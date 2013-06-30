View = require './view'

module.exports = class FormView extends View
  tag-name: 'form'
  events:
    'click .cancel-form': 'dismiss'
    'submit': 'submit'
  
  save: !~>
    @model.save!
      .done !~>
        @publish-save it
        @dismiss!
      #.always !~> remove loader etc

  publish-save: !->
    if @save-event
      @publish-event that, it
    else
      throw new Error "FormView must have a save event"

  dismiss: !~>
    it.preventDefault!
    @trigger 'dispose'
    @dispose!

  submit: ~>
    console.log 'mdr'
    @save! if it.current-target.check-validity!
    false