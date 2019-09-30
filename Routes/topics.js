// ROUTES

const express = require('Express');
const router = express.Router();
const topic = require('../Model/topic.js');


//all topics
router.get('/',(req,res)=>{
	console.log("INSIDE !")
	topic.getTopics((err,topic)=>{            
		if (err){
			console.log("Error at getTopic")
			res.send("Error at getTopic")
		}
		console.log(topic)
		res.json(topic);
	})
})

//specific User
router.get('/:id',(req,res)=>{
	let id = req.params.id;                 
	console.log('Requested id = '+id); 
	topic.getTopicsById(id,(err,topic)=>{
		if(err){
			console.log('Error at getSpecificTopic')
			res.send('Error at getSpecificTopic')
		}
		res.json(topic)
	})
})

//add User
router.post('/add',(req,res)=>{
	let obj = req.body.topic;            
	console.log(req.body.topic);
	topic.addTopic(obj,(err,topic)=>{
		if(err){
			console.log("Error at addTopic");
			res.send("Error at addTopic");
		}
		console.log("success");
		res.json(topic);
	})
})


//Updation
router.put('/:id',(req,res)=>{
	let id = req.params.id;              
	let edit = req.body.topic;          
	topic.editTopic(id,edit,{},(err,topic)=>{        
		if(err){
			console.log("Error at edittopic")
			
		}
		console.log('no error : '+topic);
		res.json(topic);
	})
})

//deletion
router.delete('/:id',(req,res)=>{
	let id = req.params.id;                
	topic.removeTopic(id,(err,topic)=>{      
		if(err){
			console.log('Error at deletion');
		}
		console.log('No Error: ');
		res.json(topic);
	})
})


module.exports = router;