require! <[express-crud-api]>

module.exports = express-crud-api 'topic' (req, res) ->
	req.body{title} <<< forum_id: req.body.forum.id