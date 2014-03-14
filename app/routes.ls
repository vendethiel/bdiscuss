module.exports = !(m) ->
  m '' 'home#index'
  m 'forums' 'forum#index'
  m 'forum/:id' 'forum#show'
  m 'topic/:id' 'topic#show'
  m 'user/:id' 'user#show'