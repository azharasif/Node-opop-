// MODEL (Schema)
const puppeteer = require('puppeteer');
const mongoose = require("Mongoose");

const videoSchema = mongoose.Schema({
	path: {
		type: String,
		required: true
	},
	tags: {
		type: String,
		required: true
	},

	rating: {
		type: Number,
		require: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});
let video = module.exports = mongoose.model('Video', videoSchema);
//Get all Videos
module.exports.getVideos = (callback, limit) => {
	return video.find(callback).limit(limit).populate('userId', 'first_name');
}

module.exports.getSearch =(data , callback)=>{
	console.log(data);
 video.findOne(data , function(err , da){

console.log(da)
 }
 )}

module.exports.getTrends = () => {
	const keys = require('../keys');
	//keys example given below
	// const twitter = {
	// 	consumer_key: 'hjvbjbvhbjhbbhwjbkfhabk',
	// 	consumer_secret: 'qhkhrhvv483hg74vrewvyunv82hrv78hvhh2v8h',
	// 	access_token_key: '7252938948-qervwbvbhjvbkbvj2uvjksajvkjbev93849394uf',
	// 	access_token_secret: 'adsvnnvjwdndvjnjdvski3j83juinvrvejdnkjdvnjeknv'
	// }

	var Twitter = require('twitter');

	var client = new Twitter(keys.twitter);

	return client.get('https://api.twitter.com/1.1/trends/place.json', { id: 23424922 });
}

module.exports.addVideo = (data, callback) => {
	console.log(data);
	let add = {
		path: data.path,
		tags: data.tags,
		rating: data.rating
	}

	console.log(add)
	video.create(add, callback);
}

// edit Video
module.exports.editVideo = (id, data, option, callback) => {
	let query = { _id: id }
	let update = {
		path: data.path,
		tags: data.tags,
		rating: data.rating
	}
	video.findOneAndUpdate(query, update, option, callback).populate('userId', 'first_name');
}

// dalete Video
module.exports.removeVideo = (id, callback) => {
	let query = { _id: id }
	video.remove(query, callback);
}

