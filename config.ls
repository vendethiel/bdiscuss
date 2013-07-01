assets =
  javascripts:
    'vendor/jquery/jquery.js'
    'vendor/lodash/dist/lodash.js'
    'vendor/backbone/backbone.js'
    'vendor/chaplin/brunch/chaplin.js'
    'vendor/backbone.stickit/backbone.stickit.js'
  stylesheets:
    ...

exports.config =
  paths:
    public: '_public'

  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(vendor|node_modules)/
      order:
        before: assets.javascripts

    templates:
      joinTo: 'js/app.js'

    stylesheets:
      joinTo:
        'css/app.css': /^(app|vendor)/
      order:
        before: assets.stylesheets

  server:
    path: 'server.ls'
    db: "mysql://root@localhost/bdiscuss?debug=true"

  plugins:
    jade: {+pretty}
    static_jade:
      extension:  '.static.jade'
    javascripts: assets.javascripts
    stylesheets: assets.stylesheets