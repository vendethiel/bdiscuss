module.exports = !(m) ->
  m '' 'home#index'
  m 'forums/' 'forum#index'
  m 'forum/:id' 'forum#show'
  # this could be /forum/:forum_id/topic/:id
  # question being: do we want that?
  # that'd map pretty closely to what Rails does
  # but once again, is that wanted?
  m 'topic/:id' 'topic#show'