exports.config =
  paths:
    public: '_public'

  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(bower_components|vendor)/

    templates:
      joinTo:
        'js/app.js': /^app/

    stylesheets:
      joinTo: 'css/app.css'

  server:
    path: 'server.ls'
    db: "mysql://root@localhost/bdiscuss?debug=true"

  plugins:
    jade: {+pretty}
    static_jade:
      extension:  '.static.jade'