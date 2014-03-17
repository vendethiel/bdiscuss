require! <[views/shared/layout mediator routes]>

module.exports = class Application extends Chaplin.Application
  title: 'Brunch:discuss'

  init-layout: !->
    @layout = new layout it

  init-mediator: !->
    mediator.create-user!

    super!

  start: !->
    mediator.user.fetch!then do
      !~> super!
      !~>  # logout if there is no info
        mediator.removeUser!
        super!