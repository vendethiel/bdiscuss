require! <[orm fs express]>
{config} = require './brunch-config'

app = express!

# Configuration
PORT = config.server.port ? 3333
# brunch's public path
PUBLIC_PATH = config.paths?public ? 'public'

# Set up ORM
app.use orm.express config.server.db,
  define: (db, models) !->
    require('./server/models') db, models

# Expose server to Brunch's watcher
module.exports = (callback) !->
  app.listen PORT, !->
    console.log "Express started"
    callback!

# Routing : Brunch catch-all and our API
try
  app.use express.static PUBLIC_PATH
  app.use '/api' require './server/api'
catch => console.log e

/**
 * Index serving (catch-all route) for backbone
 * Read index only when it's available
 *  (should be using a cache helper in production)
 */
app.use (req, res) !->
  res.writeHeader 200 'Content-Type': 'text/html'
  res.end fs.readFileSync "#PUBLIC_PATH/index.html"