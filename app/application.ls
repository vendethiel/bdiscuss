require! <[chaplin controllers/header-controller controllers/session-controller views/shared/layout mediator routes]>

# The application object
module.exports = class Application extends chaplin.Application
  title: 'Brunch:discuss'

  initialize: ->
    super!

    # Initialize core components
    @init-dispatcher controller-suffix: '-controller'
    @init-layout!
    @init-mediator!

    # Application-specific scaffold
    @init-controllers!

    # Register all routes and start routing
    @init-router routes

    @start-routing!
    # You might pass Router/History options as the second parameter.
    # Chaplin enables pushState per default and Backbone uses / as
    # the root per default. You might change that in the options
    # if necessary:
    # @initRouter routes, pushState: false, root: '/subdir/'

    # Freeze the application instance to prevent further changes
    Object.freeze? this

  # Override standard layout initializer
  # ------------------------------------
  init-layout: ->
    # Use an application-specific Layout class. Currently this adds
    # no features to the standard Chaplin Layout, it’s an empty placeholder.
    @layout = new layout {@title}

  # Instantiate common controllers
  # ------------------------------
  init-controllers: ->
    new headerController
    new sessionController

  # Create additional mediator properties
  # -------------------------------------
  init-mediator: ->
    # Add additional application-specific properties and methods
    mediator.user = null

    # Seal the mediator
    mediator.seal!
