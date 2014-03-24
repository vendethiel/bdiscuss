require! <[express-crud-api]>

module.exports = express-crud-api 'message',
	filter-fields: (req, res) ->
		unless user = req.session.user-id
			res.send 'null'
			return

		req.body{content} <<< do
			topic_id: req.body.topic.id
			user_id: req.session.user-id
			created_at: new Date
			updated_at: new Date