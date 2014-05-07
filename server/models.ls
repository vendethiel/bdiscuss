module.exports = (db, models) !->
	# settings
	db.settings.set 'instance.autoFetchLimit' 3

	# models
	models.user = db.define 'users',
		username: String
		password: String
		admin: Boolean

	models.forum = db.define 'forums',
		name: String

	models.topic = db.define 'topics',
		title: String
		locked: Boolean

	models.message = db.define 'messages',
		content: String
		created_at: Date
		updated_at: Date


	# :forum has_many :topics
	models.topic.has-one 'forum', models.forum, {reverse: 'topics', +required, +auto-fetch}
	# :topic has_many :messages
	models.message.has-one 'topic', models.topic, {reverse: 'messages', +required, +auto-fetch}
	# :user has_many :messages
	models.message.has-one 'user', models.user, {reverse: 'messages', +required, +auto-fetch}