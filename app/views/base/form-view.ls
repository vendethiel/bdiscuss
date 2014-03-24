View = require './view'

module.exports = class FormView extends View
  tag-name: 'form'
  events:
    'click .cancel-form': 'dismiss'
    'submit': 'submit'

  save: !->
    @model.save!
      .success !~>
        @publish-save it
        @dismiss!
      .fail !~> console.log 'you fooged'

  publish-save: !->
    unless @save-event
      throw new Error "FormView must have a save event"

    @publish-event @save-event, it

  dismiss: !->
    it?preventDefault!
    @trigger 'dispose'
    @dispose!

  submit: ->
    # XXX rely on html5 ? might as well o/
    @save! if it.current-target.check-validity!
    it?preventDefault!
    false