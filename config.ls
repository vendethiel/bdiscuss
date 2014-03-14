exports.config =
  paths:
    public: '_public'

  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(bower_components|vendor)/

    templates:
      joinTo: 'js/app.js'

    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^(bower_components|vendor)/

  server:
    path: 'server.ls'
    db: "mysql://root@localhost/bdiscuss?debug=true"

  plugins:
    jaded:
      static-patterns: //^app/index.jade$//