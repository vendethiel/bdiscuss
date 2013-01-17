module.exports = !(m) ->
  m '' 'home#index' name: 'home'
  m 'forums/' 'forums#index' name: 'forums'
  m 'forum/:id' 'forums#show' name: 'view_forum'
  m 'topic/:id' 'topics#show' name: 'view_topic'