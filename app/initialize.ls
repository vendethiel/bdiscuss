Application = require 'application'
#routes = require 'routes'

# Initialize the application on DOM ready event.
<-! $
app = new Application
app.initialize!
/*
new Application {
title: 'Bdiscuss'
controller-suffix: '-controller'
routes
}
*/