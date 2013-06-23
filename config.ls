assets =
  javascripts:
    'vendor/jquery/jquery.js'
    'vendor/underscore/underscore.js'
    'vendor/backbone/backbone.js'
    'vendor/chaplin/brunch/chaplin.js'
    'vendor/backbone.stickit/backbone.stickit.js'
    'vendor/jade-runtime/jade-runtime.js'
  stylesheets:
    ...

exports.config =
  paths:
    public: '_public'

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        before: assets.javascripts

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
      order:
        before: assets.stylesheets
        #after:
        #  'vendor/styles/helpers.css'

    templates:
      joinTo: 'javascripts/app.js'

  plugins:
    javascripts: assets.javascripts
    stylesheets: assets.stylesheets
    static_jade:
      options:
        pretty: true
      extension: ".static.jade"