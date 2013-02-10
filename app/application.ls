require! <[chaplin controllers/header-controller controllers/session-controller views/shared/layout mediator routes]>
require 'lib/jade-helpers'

# The application object
module.exports = class Application extends chaplin.Application
  title: 'Brunch:discuss'

  initialize: ->
    super!

    # Initialize core components
    @initDispatcher controllerSuffix: '-controller'
    @initLayout!
    @initMediator!

    # Application-specific scaffold
    @initControllers!

    # Register all routes and start routing
    @initRouter routes
    # You might pass Router/History options as the second parameter.
    # Chaplin enables pushState per default and Backbone uses / as
    # the root per default. You might change that in the options
    # if necessary:
    # @initRouter routes, pushState: false, root: '/subdir/'

    # Freeze the application instance to prevent further changes
    Object.freeze? this

  # Override standard layout initializer
  # ------------------------------------
  initLayout: ->
    # Use an application-specific Layout class. Currently this adds
    # no features to the standard Chaplin Layout, it’s an empty placeholder.
    @layout = new layout {@title}

  # Instantiate common controllers
  # ------------------------------
  initControllers: ->
    new headerController
    new sessionController

  # Create additional mediator properties
  # -------------------------------------
  initMediator: ->
    # Add additional application-specific properties and methods
    mediator.user = null

    # Seal the mediator
    mediator.seal!
