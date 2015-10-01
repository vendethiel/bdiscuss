require! <[views/base/view ./templates/user-nav]>
FormLoginView = require 'views/sessions/form-login-view'

module.exports = class UserNav extends view
  template: user-nav
  className: 'user-nav'
  id: 'user-nav'
  region: 'user-nav'

  regions:
    'login-form': '.login-form-container'

  events:
    'click .login-button': 'showLoginForm'

  show-login-form: ->
    alert 'hey!!'

    false

  render: ->
    super ...
    # TODO check for "currentUser" first..
    @create-login-form!

  create-login-form: !->
    @topicView = new FormLoginView region: 'login-form'