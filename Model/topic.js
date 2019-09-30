// MODEL (Schema)

const mongoose = require ("Mongoose");

const topicSchema = mongoose.Schema({
	topic_name:{
		type : String,
		required : true
	},

	date:{
		type : Date,
		default : Date.now()
	}
});


let topic = module.exports = mongoose.model('Topic',topicSchema);

//Get all topics
module.exports.getTopics = (callback,limit)=>{
	topic.find(callback).limit(limit);
}

// get specific topic
module.exports.getTopicById = (id,callback)=>{
	topic.findbyId(id,callback);
}

// add topic
module.exports.addTopic = (data,callback)=>{
	console.log("AddTopic");
	let add={                                  
		topic_name : data.topic_name,
		date : data.date
	}
	topic.create(add,callback);                 
}

// edit topic
module.exports.editTopic = (id,data,option,callback)=>{     
	let query={_id:id}                                     
	let update = {                                         
		topic_name : data.topic_name,
		date : data.date
	}
	topic.findOneAndUpdate(query, update, option, callback);     
}

// dalete topic
module.exports.removeTopic = (id,callback)=>{
	let query={_id:id}
	topic.findOneAndRemove(query, callback);                   
}

