// MODEL (Schema)

const mongoose = require("Mongoose");

const channelSchema = mongoose.Schema({
    channel_name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    videos_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }]
});


let channel = module.exports = mongoose.model('Channel', channelSchema);

//Get all channels
module.exports.getChannels = (callback, limit) => {
    channel.find(callback).limit(limit);
}

module.exports.addVideoInChannel = (data, callback) => {
    query = { userId: data.userId };
    console.log(query);
    channel.findOneAndUpdate(query, { $addToSet: { videos_list: data.vid } }, callback);
}

// get specific channel
module.exports.getChanneById = (id, callback) => {
    channel.findbyId(id, callback);
}

// get channel by user Id
// module.exports.getChanneByUserId = (id, callback) => {
//     console.log('get here')
//     let query = { userId: id }
//     channel.find(query).exec(function(err, data) {

//         if (err) return console.log(err);

//         console.log(data)

//     })



// }

// add channel
module.exports.addChannel = (data, callback) => {
    console.log(data);

    let add = {
        channel_name: data.channel_name,
        userId: data.userId
    }
    channel.create(add, callback);
}

// edit channel
module.exports.editChannel = (id, data, option, callback) => {
    let query = { _id: id }
    let update = {
        channel_name: data.channel_name,
        videos_list: data.videos_list
    }
    channel.findOneAndUpdate(query, update, option, callback);
}

// dalete channel
module.exports.removeChannel = (id, callback) => {
    let query = { _id: id }
    channel.findOneAndRemove(query, callback);
}