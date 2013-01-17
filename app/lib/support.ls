require! <[chaplin lib/utils]>

# Application-specific feature detection
# --------------------------------------

# Delegate to Chaplin’s support module
support = utils.beget chaplin.support

# _(support).extend
  # someMethod: ->

module.exports = support
