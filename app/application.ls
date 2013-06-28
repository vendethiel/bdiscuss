require! <[chaplin views/shared/layout mediator routes]>

/* Chaplin 0.10 !
module.exports = class Application extends chaplin.Application
  title: 'Brunch:discuss'

  init-layout: (options = {}) ->
    options <<< {@title}
    @layout = new layout options

  init-mediator: !->
    Chaplin.mediator.user = null

    super!
*/

module.exports = class Application extends chaplin.Application
  title: 'Brunch:discuss'

  initialize: ->
    super!

    # Initialize core components
    @init-dispatcher controller-suffix: '-controller'

    @init-mediator!
    
    # Initialize app components
    @init-layout!

    @init-composer!

    # Register all routes and start routing
    @init-router routes

    @start-routing!

    # Freeze the application instance to prevent further changes
    Object.freeze? this

  # Override standard layout initializer
  # ------------------------------------
  init-layout: ->
    @layout = new layout {@title}

  # Create additional mediator properties
  # -------------------------------------
  init-mediator: ->
    # Add additional application-specific properties and methods
    mediator <<<
      user: null

    mediator.seal!