const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model("User");
const Club= mongoose.model("Club");
const Comment= mongoose.model("Comment");
const  Post= mongoose.model("Post");
const  Event= mongoose.model("Event");

const  requireLogin = require('../middleware/requireLogin');

// fetch(`/api/isUserSubscribe/${clubId}`)

router.get("/api/isUserSubscribe/:clubId/:userId", (req,res) => {
    var UserSubscribe = false;
    Club.findOne({_id:req.params.clubId})
    .then(club => {
        console.log(club);
        club.subscribedBy.forEach(function(user){

            if(String(req.params.userId) == String(user))
            UserSubscribe = true;
        });
        
        res.json({UserSubscribe: UserSubscribe});
        // .then(currentuser => {
        //     if(currentuser)
        //      isSubscribed = true;
        //     res.json({isSubscribed: isSubscribed});
             
        // }).catch (err => {
        //     console.log(err);
        // })
    })
    .catch ( err => {
        console.log(err);
    })
});

router.get("/api/UserSubscribe/:clubId/:userId",(req,res) => {
    var UserSubscribe = true;
    console.log(req.params.clubId);
    Club.findOneAndUpdate({_id:req.params.clubId},{$push:{"subscribedBy":req.params.userId}} ,{new:true})
    .then( club => {
        club.save();
        console.log(club.subscribedBy);
        res.json({UserSubscribe:UserSubscribe});
    })
    .catch ( err => {
        console.log(err);
    })
    // Company.findOneAndUpdate({_id:req.params.id},{$push:{"subscribedBy":req.user._id} },{new:true},function(err,company){
    //   if (err) {
    //     console.log(err);
    //     req.flash("error",err.message);
    //     return res.redirect("back");
    // }
    //   else
    //   {
    //     company.save();
    //     console.log(company);
    //     req.flash("success","Further updates will be mailed to you as you subscribed this company")
    //     res.redirect("/seeker/"+req.params.job_id+"/applyjob");
    //   }
    // });
  });
  
  
  router.get("/api/UserUnsubscribe/:clubId/:userId",(req,res) => {
      var UserSubscribe = false;
    Club.findOneAndUpdate({_id:req.params.clubId},{$pull:{"subscribedBy":req.params.userId}} ,{multi:true})
    .then( club => {
        club.save();
        console.log(club.subscribedBy);
        res.json({UserSubscribe:UserSubscribe});
      
    })
    .catch ( err => {
        console.log(err);
    })

//   Company.findOneAndUpdate({_id:req.params.id},{$pull:{"subscribedBy":req.user._id}},{multi:true},function(err,company){
//     if (err) {
//       console.log(err);
//       req.flash("error",err.message);
//       return res.redirect("back");
//   }
//     else
//     {
//       req.flash("success","You unsubscribed this company");
//       res.redirect("/seeker/"+req.params.job_id+"/applyjob");
//     }
//   });
  });

  module.exports = router;