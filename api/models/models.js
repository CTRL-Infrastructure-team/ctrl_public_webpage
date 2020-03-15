const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt');

const currentSituations = new Schema({
	'time': Date,
	'title': String,
	'content': String,	
	'img_url': String,
	'contributor': { type: Schema.Types.ObjectId, ref: 'Users' },
	'twitter_id': { type: Schema.Types.ObjectId, ref: 'Users' }
});

const pastWorks = new Schema({
	'time': Date,
	'title': String,
	'content': String,
	'download_url': String,
	'img_url': String,
	'contributor': { type: Schema.Types.ObjectId, ref: 'Users' },
	'producer': { type: Schema.Types.ObjectId, ref: 'Users' },
	'twitter_id': { type: Schema.Types.ObjectId, ref: 'Users' }
});

const Users = new Schema({
	'username': String,
	'password': String
});

mongoose.connect('mongodb://127.0.0.1/ctrlPublicSite', {
	 useNewUrlParser: true,
	 useUnifiedTopology: true
});

Users.pre('save', function(next) {
	let user = this,
		hashed_password = bcrypt.hashSync(user.password, 10);

	user.password = hashed_password;
	next();
});

exports.Users = mongoose.model('User', Users); 
exports.currentSituations = mongoose.model('currentSituation', currentSituations);
exports.pastWorks = mongoose.model('pastWork', pastWorks);