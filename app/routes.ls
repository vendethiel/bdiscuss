module.exports = !(m) ->
  m ''                            'home#index'

  m 'forums'                      'forum#index'
  m 'forum/:id'                   'forum#show'
  
  m 'forum/:forum_id/topic/:id'   'topic#show'
  
  m 'user/:id'                    'user#show'