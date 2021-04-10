const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Club= mongoose.model("Club");
const Comment= mongoose.model("Comment");
const  Post= mongoose.model("Post");
const  Event= mongoose.model("Event");

const  requireLogin = require('../middleware/requireLogin');


// const posts = [
    // {
    //     _id: "5657",
    //     heading:"Event1",
    //     like:23,
    //     description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pa",
    //     createdAt :"25 July 2021",
    //     photo: "https://images.unsplash.com/photo-1579464506841-1dfe2ec753c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"

    // },
    // {
    //     _id: "5658",
    //     heading:"Event3",
//         like:12,
//         description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pa",
//         createdAt :"22 May 2021",
//         photo: "https://images.unsplash.com/photo-1610697160852-8507f0db7b97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"

//     },
//     {
//         _id: "5659",
//         heading:"Event2",
//         like:53,
//         description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pa",
//         createdAt :"15 April 2021",
//         photo: "https://images.unsplash.com/photo-1616273552294-ae0e1224aaad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=382&q=80"

//     }
// ]

router.get('/api/posts/latest',(req,res)=>{
     var days = 7;
    let current_date = new Date();
    let last_date = new Date(current_date.getTime()- (days * 24 * 60 * 60 * 1000))
   // console.log(last_date);
    Post.find({'createdAt':{$gte: last_date}})
    .sort('-createdAt').populate('postedBy',"_id name").then(posts =>{
     //   console.log(posts.length);
       console.log(posts);
        res.json({posts:posts});
    }).catch(err =>{
        console.log(err);
    })


    // console.log(current_date);
    // console.log(current_date.getDate());
    // return res.send(posts);
})



router.post('/api/addPost',(req,res)=>{
    console.log(req.body);
    const{title,description,photo,clubId} = req.body;
    if(!description || !title) 
        {
           return res.status(422).json({error:"Please add Title as well as description"});

        } 
    const post = new Post({
        heading:title,
        description:description,
        photo:photo
    });
    Club.findOne({_id:clubId}).populate('subscribedBy')
    .then( club =>{
    
  const message = `${club.name} created a new post ${title}.` 
  const notif = {
       text: message,
       createdAt: Date.now(),
       Club_id: club.id,
       img: club.logo
  }
   club.subscribedBy.forEach(function (eachuser) {
       eachuser.notifications.push(notif);
       eachuser.save();
    });


  //   //email for notification of new job
  //   if (users.length > 0) {
  //     const output = `
  // <p>Greetings from ClubMix,</p>
  // <p> An event is soon going to be held organized by ${club.name} Club</p>
  // <h3>Event details</h3>
  // <h2>${Title}</h2>
  // <ul>
  // <li><b>Description</b>: ${description} </li>
  // <li><b>Start Date</b>: ${Start_Date} </li>
  // <li><b>End Date</b>: ${End_Date} </li>
  // </ul>
  // <p>
  // We are looking forward for your particiaption
  // </p>
  // <p>NOTE: You are receiving this mail because you are subscribed to this page </p>
  // `;
  //     let transporter = nodemailer.createTransport({
  //       // host: 'mail.google.com',
  //       host: 'smtp.gmail.com',
  //       port: 587,
  //       secure: false,
  //       //service: 'Gmail',
  //       auth: {
  //         user :process.env.PORTAL_MAIL_ID,
  //         pass :process.env.PORTAL_MAIL_PASSWORD
  //       },
  //       tls: {
  //         rejectUnauthorized: false
  //       }
  //     });

  //     let mailOptions = {
  //       from: '"ClubMix"',
  //       to: users,
  //       subject: 'Upcoming Event !!',
  //       text: '',
  //       html: output
  //     };
  //     transporter.sendMail(mailOptions, (error, info) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log('Message sent: %s', info.messageId);
        //console.log('Preview Url : %s', nodemailer.getTestMessageUrl(info));
        //res.redirect('/company/' + job.postedBy.id + '/viewjob')
    // console.log(event);
      // })
    // }

    }).catch ( err => {
        console.log(err);
    })
    post.postedBy.id = clubId;
    post.postedBy= clubId;
    Club.findOne({_id:clubId}).then(club =>{
        // console.log(typeof(post_count));
        club.post_count++;
        // console.log("checking posts count");
        // console.log(club);
        // console.log(club.post_count);
        club.save();
        console.log(club);

    })
    post.save().then(post =>{
        res.json({message:"saved post successfully",post:post});
    }).catch(err=>{
        console.log(err);
    })
})



router.put('/api/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else{
            res.json(result);
        }

    });
});

router.put('/api/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else{
            res.json(result);
        }

    })
})

module.exports = router;
