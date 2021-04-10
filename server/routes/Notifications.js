const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model("User");
const Club= mongoose.model("Club");
const Comment= mongoose.model("Comment");
const  Post= mongoose.model("Post");
const  Event= mongoose.model("Event");

const  requireLogin = require('../middleware/requireLogin');

router.get("/api/notifs/:id", (req,res) => {
    User.findOne({_id:req.params.id})
    .then( user =>{
        const notifs = user.notifications;
        console.log(user);
        console.log(notifs);
        notifs.reverse();
        res.json({notifs:notifs});
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;