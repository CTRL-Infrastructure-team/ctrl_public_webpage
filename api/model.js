var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var currentSituations = new Schema({
	'time': Date,
	'title': String,
	'content': String,	
	'img_url': String,
	'contributor': String,
	'twitter_id': String
});

var pastWorks = new Schema({
	'time': Date,
	'title': String,
	'content': String,
	'download_url': String,
	'img_url': String,
	'contributor': String,
	'producer': String,
	'twitter_id': String
});

mongoose.connect('mongodb://127.0.0.1/ctrlPublicSite');

exports.currentSituations = mongoose.model('currentSituation', currentSituations);
exports.pastWorks = mongoose.model('pastWork', pastWorks);