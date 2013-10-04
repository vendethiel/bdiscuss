require! <[views/shared/layout routes]>
{mediator} = Chaplin

module.exports = class Application extends Chaplin.Application
  title: 'Brunch:discuss'

  init-layout: !->
    @layout = new layout it

  init-mediator: !->
    u = username: 'hey' admin: 1

    Chaplin.mediator <<<
      user: get: -> u[it]

    super!