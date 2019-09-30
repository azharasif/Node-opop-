// ROUTES

const express = require('Express');
const router = express.Router();
const feedback = require('../Model/feedback.js');


//all Feedbacks
router.get('/',(req,res)=>{
	console.log("INSIDE !")
	feedback.getFeedbacks((err,feedback)=>{            
		if (err){
			console.log("Error at getFeedback")
			res.send("Error at getFeedback")
		}
		console.log(feedback)
		res.json(feedback);
	})
})

//specific Feedbacks
router.get('/:id',(req,res)=>{
	let id = req.params.id;                 
	console.log('Requested id = '+id); 
	feedback.getFeedbackById(id,(err,feedback)=>{
		if(err){
			console.log('Error at getSpecificFeedback')
			res.send('Error at getSpecificFeedback')
		}
		res.json(feedback)
	})
})

//add Feedbacks
router.post('/add',(req,res)=>{
	let obj = req.body;       
	console.log("Routes")     
	console.log(obj);
	feedback.addFeedback(obj,(err,feedback)=>{
		if(err){
			console.log("Error at addFeedback");
			res.send("Error at addFeedback");
		}
		res.json(feedback);
	})
})


//Updation
router.put('/:id',(req,res)=>{
	let id = req.params.id;              
	let edit = req.body.feedback;          
	feedback.editFeedback(id,edit,{},(err,feedback)=>{        
		if(err){
			console.log("Error at editFeedback")
			
		}
		console.log('no error : ')
		res.send(feedback);
	})
})

//deletion
router.delete('/:id',(req,res)=>{
	let id = req.params.id;                
	feedback.removeFeedback(id,(err,feedback)=>{      
		if(err){
			console.log('Error at deletion');
		}
		console.log('No Error: ');
		res.json(feedback);
	})
})


module.exports = router;