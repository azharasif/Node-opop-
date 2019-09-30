// ROUTES

const express = require('Express');
const router = express.Router();
const video = require('../Model/video.js');
const multerConfig = require("../config/multerConfig");
const puppeteer = require('puppeteer');

//all videos
// router.get('/', (req, res) => {
// 	var videos = video.getVideos((err, video) => {
// 		if (err) {
// 			console.log("Error at getVideo")
// 			res.send("Error at getVideo")
// 		}
// 	})

// 	var trends = video.getTrends((err, video) => {
// 		if (err) {
// 			console.log("Error at getVideo")
// 			res.send("Error at getVideo")
// 		}
// 	})
// })

router.get('/', (req, res) => {
	
	var trends = video.getTrends();
	var videos = video.getVideos();

	Promise.all([trends, videos]).then((values) => {
		var currentTrends = [];
		for (let index = 0; index < 5; index++) {
			currentTrends.push(values[0][0].trends[index].name);
		}
		var fullData = {
			trends: currentTrends,
			videos: values[1]
		}

		console.log('********************trends------------');
		console.log(fullData.trends);
		console.log('*****************videos------------');
		console.log(fullData.videos);

		res.send(fullData);
	});
});

router.get('/search', (req , res)=>{

	console.log("checking");
	console.log(req.query.q);

	
	video.find({tags:req.query.q}).exec(function(err , search_vids){

		console.log(search_vids);
		res.json(search_vids);
		

	})

})



router.get('/feed/:id', (req, res) => {
	let id = req.params.id;
	video.getfeed(id, (err, videos) => {
		if (err) {
			console.log("Error at Displaying Feed")
			res.send("Error at Displaying Feed !")
		}
		console.log(videos)
		res.json(videos);
	})
})


//specific video
router.get('/user/:id', (req, res) => {
	let id = req.params.id;
	console.log('Requested id = ' + id);
	video.getVideoByUserId(id, (err, video) => {
		if (err) {
			console.log('Error at getSpecificVideo')
			res.send('Error at getSpecificVideo')
		}
		res.json(video);
	})
})

// Save Video in local storage
router.post('/save', (req, res) => {
	let obj = req.body.video;
	multerConfig.saveProductImage(req, res, (err, video) => {
		if (err) {
			console.log("Error at SaveVideo");
			console.log(err);
			res.send("Error at SaveVideo");
		}
		console.log(video);
		res.json(video);
	})
})


// Add Video in Mongo Db
router.post('/add', (req, res) => {
	let obj = req.body;

	video.addVideo(obj, (err, video) => {
		if (err) {
			console.log("Error at addVideo");
			console.log(err);
			res.send("Error at addVideo");
		}
		console.log(video);
		res.json(video);
	})
})

//Updation
router.put('/:id', (req, res) => {
	let id = req.params.id;
	let edit = req.body.video;
	video.editVideo(id, edit, {}, (err, video) => {
		if (err) {
			console.log("Error at editVideo")

		}
		console.log('no error : ')
		res.json(video);
	})
})

//deletion
router.delete('/:id', (req, res) => {
	let id = req.params.id;
	video.removeVideo(id, (err, video) => {
		if (err) {
			console.log('Error at deletion');
		}
		console.log('No Error: ' + video)
		res.json(video);;
	})
})


module.exports = router;