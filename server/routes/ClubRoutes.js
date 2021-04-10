const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model("User");
const Club= mongoose.model("Club");
const Comment= mongoose.model("Comment");
const  Post= mongoose.model("Post");
const  Event= mongoose.model("Event");

// const {isLoggedIn} =require('../middleware/requireLogin');
const  requireLogin = require('../middleware/requireLogin');

router.post('/api/addClub',requireLogin,(req,res)=>{
    // console.log(req.user);
    console.log(req.body);
    const {name,description,website_link,insta_link,facebook_link,twitter_link
        ,clubType,date_of_establishment,contact_number,club_email,logo} = req.body;
        if(!description || !clubType || !name) 
        {
           return res.status(422).json({error:"Please add all the fields"});
        } 
        Club.findOne({name:name}).then((savedClub)=>{
            if(savedClub){
          return res.status(422).json({error:"Club with this name exist"});
            }
            const club = new Club({
                name,
                description,
                website_link,
                insta_link,
                facebook_link,
                twitter_link,
                clubType,
                date_of_establishment,
                contact_number,
                club_email,
                logo,
            });
            // console.log(club);
            club.clubAdmin.id = req.user;
            // console.log(club);
            club.save().then(club =>{
                // console.log(club);
                res.json({message:"saved successfully", club:club});
            }).catch(err=>{
                console.log(err);
            });
        }); 
});

router.get('/api/allClubs/:id',(req,res)=>{
    // console.log("hii");
    // console.log(req.params.id);
    Club.find({'clubType':req.params.id})//.populate('clubAdmin.id',"_id name email registration_no")
    .then(clubs =>{
        // console.log(typeof(clubs));
        res.json({clubs:clubs});
    }).catch(err=>{
        console.log(err);
    });
});


router.get('/api/allClubPostandEvent/:id',(req,res)=>{
    console.log(req.params.id);
//     Post.aggregate([
//         {
//             $lookup:
//             {
//                 from:'Event',
//                 localField:"postedBy.id",
//                 foreignField :'postedBy.id',
//                 as :"Common"
//             }
//     }
// ]).find({'postedBy.id':req.params.id}).then(postsandevents=>{
//     console.log(postsandevents);
//     res.json({postsandevents:postsandevents});
// })
    Post.find({'postedBy':req.params.id}).then(posts=>{
              Event.find({'postedBy':req.params.id}).then(events=>{
                    // console.log(typeof(posts));
                    // console.log(events);
                    
                     let PostsandEvents ;
                    // console.log(PostsandEvents);
                     PostsandEvents = [...posts,...events];
                    // console.log(PostsandEvents);
                    PostsandEvents.sort((post,event)=>{
                        return  new Date(event.createdAt) -new Date(post.createdAt);
                    })
                    // console.log(PostsandEvents);
                     res.json({PostsandEvents:PostsandEvents});

              }).catch(err =>{
                  console.log(err);
              })
    }).catch(err =>{
        console.log(err);
    })
    // post2
// event1
// post1
// purane

})
router.get('/api/clubInfo/:id',(req,res)=>{
    console.log("hii");
    console.log(req.params.id);
    Club.findOne({_id:req.params.id})//.populate('clubAdmin.id',"_id name email registration_no")
    .then(club =>{
        // console.log(club);
        res.json({club:club});
    }).catch(err=>{
        console.log(err);
    });
});


// router.get('/api/allTechnicalClubs',(req,res)=>{
    // Club.find({clubType:'Techincal'}).populate('clubAdmin.id',"_id name email registration_no")
    // .then(clubs =>{
//         res.json({clubs});
//     }).catch(err=>{
//         console.log(err);
//     });

// });

// router.get('/api/allCulturalClubs',(req,res)=>{
//     Club.find({clubType:'Cultural'}).populate('clubAdmin.id',"_id name email registration_no")
//     .then(clubs =>{
//         res.json({clubs});
//     }).catch(err=>{
//         console.log(err);
//     });

// });

// router.get('/api/allSportsClubs',(req,res)=>{
//     Club.find({clubType:'Sports'}).populate('clubAdmin.id',"_id name email registration_no")
//     .then(clubs =>{
//         res.json({clubs});
//     }).catch(err=>{
//         console.log(err);
//     });
// });
module.exports = router;
