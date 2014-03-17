require! <[views/shared/layout mediator routes]>

module.exports = class Application extends Chaplin.Application
  title: 'Brunch:discuss'

  init-layout: !->
    @layout = new layout it

  init-mediator: !->
    u = id: 1

    mediator.create-user!

    super!

  start: !->
    mediator.user.fetch!then do
      !-> super!
      !->
        mediator.removeUser!
        super! # logout if there is no info