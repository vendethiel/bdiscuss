export index = !(req, res) ->
	return res.send 301 unless user = req.session.user-id
	err, model <- req.models.user.get req.params.user
	return res.send 400 err if err or not model
	res.send model{username, admin}

export show = !(req, res) ->
	err, model <- req.models.user.get req.params.user
	return res.send 400 err if err or not model
	res.send model{username, admin}