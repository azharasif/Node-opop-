// ROUTES

const express = require('Express');
const router = express.Router();
const channel = require('../Model/channel.js');


//all Channels
router.get('/', (req, res) => {
    console.log("INSIDE !")
    channel.getChannels((err, channel) => {
        if (err) {
            console.log("Error at getChannel")
            res.send("Error at getChannel")
        }
        console.log(channel)
        res.json(channel);
    })
})

//specific test
router.get('/:id', (req, res) => {
    let id = req.params.id;
    //console.log('Requested id = '+id); 
    channel.getChannelById(id, (err, channel) => {
        if (err) {
            console.log('Error at getSpecificChannel')
            res.send('Error at getSpecificChannel')
        }
        res.json(channel)
    })
})


//Get Channel by userID
// router.get('/user/:id', (req, res) => {

//     console.log('hello')
//     let id = req.params.id;
//     console.log('Requested id = ' + id);
//     channel.getChanneByUserId(id, (err, channel) => {
//         if (err) {
//             console.log(err)
//             res.send('Error at getSpecificChannel')
//         }
//         console.log(channel)
//             //res.json(channel)
//     })
// })
router.get('/user/:id', (req, res) => {
    console.log('hello')
    let id = req.params.id;

    let query = { userId: id }

    channel.find(query).exec(function(err, data) {

        if (err) return console.log(err);
        console.log(data)
        res.json(data)

    })


})

//add channel
router.post('/add', (req, res) => {
    let obj = req.body;
    console.log(obj);
    channel.addChannel(obj, (err, channel) => {
        if (err) {
            console.log("Error at addChannel");
            res.send("Error at addChannel");
        }
        res.send(channel);
    })
})

//add video in channel
router.post('/video/add', (req, res) => {
    let obj = req.body;
    console.log(obj);
    channel.addVideoInChannel(obj, (err, channel) => {
        if (err) {
            console.log("Error at add Video In Channel");
            res.send("Error at add Video In Channel");
        }
        console.log("done");
        res.send(channel);
    })
})


//Updation
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let edit = req.body.channel;
    channel.editChannel(id, edit, {}, (err, channel) => {
        if (err) {
            console.log("Error at editChannel1")

        }
        console.log('no error : ' + channel)
        res.json(channel);
    })
})

//deletion
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    channel.removeChannel(id, (err, channel) => {
        if (err) {
            console.log('Error at deletion');
        }
        console.log('No Error: ' + channel)
        res.json(channel);
    })
})


module.exports = router