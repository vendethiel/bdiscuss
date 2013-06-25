assets =
  javascripts:
    'vendor/jquery/jquery.js'
    'vendor/lodash/dist/lodash.js'
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
        'js/app.js': /^app/
        'js/vendor.js': /^vendor/
      order:
        before: assets.javascripts

    templates:
      joinTo: 'js/app.js'

    stylesheets:
      joinTo:
        'css/app.css': /^(app|vendor)/
      order:
        before: assets.stylesheets

  plugins:
    jade: {+pretty}
    static_jade:
      extension:  '.static.jade'
    javascripts: assets.javascripts
    stylesheets: assets.stylesheets