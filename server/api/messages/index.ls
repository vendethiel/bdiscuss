require! <[express-crud-api]>

module.exports = express-crud-api 'message' (req, res) ->
	req.body{content} <<< do
		topic_id: req.body.topic.id
		created_at: new Date
		updated_at: new Date