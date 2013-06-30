export index = !(req, res) ->
	err, forums <-! req.models.forum.find
	res.send forums

export show = !(req, res) ->
	err, forum <-! req.models.forum.get req.params.forum
	res.send forum