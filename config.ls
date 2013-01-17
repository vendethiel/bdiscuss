exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        # Files in `vendor` directories are compiled before other files
        # even if they aren't specified in order.before.
        before:
          'vendor/scripts/console-helper.js'
          'vendor/scripts/jquery-1.8.3.js'
          'vendor/scripts/underscore-1.4.3.js'
          'vendor/scripts/backbone-0.9.9.js'
          'vendor/scripts/backbone-stickit-0.6.1.js'

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
      order:
        before:
          'vendor/styles/normalize-2.0.1.css'
          ...
        after:
          'vendor/styles/helpers.css'
          ...

    templates:
      joinTo: 'javascripts/app.js'

  plugins:
    static_jade:                  # all optionals
      pretty: true
      extension:  ".static.jade"  # static-compile each file with this extension in `assets`