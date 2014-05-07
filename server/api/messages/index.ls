require! <[express-crud-api]>

module.exports = express-crud-api 'message',
	filter-fields: (req, res) ->
		return res.send 'null' unless user = req.session.user-id

		req.body{content} <<< do
			topic_id: req.body.topic.id
			user_id: req.session.user-id
			created_at: new Date
			updated_at: new Date