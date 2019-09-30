// ROUTES

const express = require('Express');
const router = express.Router();
const user = require('../Model/user.js');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');


//all Users
router.get('/',(req,res)=>{
	console.log("INSIDE !")
	user.getUsers((err,user)=>{            
		if (err){
			console.log("Error at getTest")
			res.send("Error at getTest")
		}
		console.log(user)
		res.json(user);
	})
})

//specific User
router.get('/:id',(req,res)=>{
	let id = req.params.id;                 
	console.log('Requested id = '+id); 
	user.getUserById(id,(err,test)=>{
		if(err){
			console.log('Error at getSpecificTest')
			res.send('Error at getSpecificTest')
		}
		res.send(test)
	})
})

//add User
router.post('/add',(req,res)=>{
	let obj = req.body;     

	user.addUser(obj,(err,user)=>{
		if(err){
			console.log(err);
			res.send("Error at addUser");
		}
		res.json(user);
	})
})

router.post('/login',(req,res)=>{
	
	let obj = req.body;
	console.log(obj);
	user.signin(obj,(err,user)=>{
	console.log("user " +user)
			bcrypt.compare(obj.pass, user.pass, function(err, result){
	console.log("result " +result)

			   if(err) {
				  return res.status(401).json({
					 failed: 'Unauthorized Access'
				  });
			   }
			   if(!result) {
				return res.status(401).json({
				   failed: 'Wrong Email or Password'
				});
			 }
			   if(result) {
				 const JWTToken = jwt.sign({
					  email: user.email,
					  _id: user._id,
					  
					  number: user.number
					},
					'secret',
					 {
					   expiresIn: '30m'//Time 30 Minutes for the session
					 });
					 return res.status(200).json({
					   success: 'Welcome tendenze',
					   token: JWTToken,
					   _id: user._id,
					   email: user.email,
					   number: user.number
					 });
				}
			   
			});
		 })
		
})


//Updation
router.put('/:id',(req,res)=>{
	let id = req.params.id;              
	let edit = req.body;          
	user.editUser(id,edit,{},(err,user)=>{        
		if(err){
			console.log("Error at editUser")
			
		}
		console.log('no error : '+user)
		res.send(user);
	})
	
})

//deletion
router.delete('/:id',(req,res)=>{
	let id = req.params.id;                
	user.removeUser(id,(err,user)=>{      
		if(err){
			console.log('Error at deletion');
		}
		console.log('No Error: ')
		res.json(user);
	})
})


module.exports = router;