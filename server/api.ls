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
#app.resource 'animes' require './api/animes'
#app.resource 'articles' require './api/articles'