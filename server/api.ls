require! <[express express-resource express-orm-handler]>

app = module.exports = express!

/**
 * Read payload (body)
 * Allow PUT/PATCH/DELETE etc
 */
app.use express.bodyParser!
app.use express.methodOverride!

/**
 * Cookies and Session
 */
app.use express.cookieParser!
app.use express.session secret: 'lel-brunch-discuss-lol'

/**
 * Express handlers
 * generate getters, ie "req.getUser"
 */
app.use express-orm-handler 'user'

/**
 * Routes
 */
app.use '/session' require 'express-orm-api-session'

/**
 * Resources
 */
app.resource 'forums' require './api/forums'
app.resource 'topics' require './api/topics'
app.resource 'messages' require './api/messages'