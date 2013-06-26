module.exports = !(db, models) ->
	models.user = db.define 'users',
		username: String
		password: String
		admin: Boolean


	models.forum = db.define 'forums',
		name: String


	models.topic = db.define 'topics',
		title: String
		locked: Boolean

	models.topic.hasOne 'forum', models.forum, {reverse: 'topics', +required, +autoFetch}


	models.message = db.define 'messages',
		title: String
		created_at: Date
		updated_at: Date

	models.message.hasOne 'topic', models.topic, {reverse: 'messages', +required, +autoFetch}