const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Club= mongoose.model("Club");
const Comment= mongoose.model("Comment");
const  Post= mongoose.model("Post");
const  Event= mongoose.model("Event");

const  requireLogin = require('../middleware/requireLogin');



// const events = [
//     {
//         _id: "5657",
//         Title :"Event1",
//         Start_date :"25 July 2021",
//         End_date :"25 July 2021",
//         description:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         postedBy:"Drams"

//     },
//     {
//         _id: "5658",
//         Title :"Event3",
//         Start_date :"22 May 2021",
//         End_date :"25 July 2021",
//         description:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         postedBy:"Drams"
//     },
//     {
//         _id: "5659",
//         Title :"Event2",
//         Start_date :"15 April 2021",
//         End_date :"25 July 2021",
//         description:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         postedBy:"Drams"
//     }
// ]

router.get('/api/events/current',(req,res)=>{
    let current_date = new Date();
    // console.log(current_date);
    Event.find({$and : [{'End_date':{$gte : current_date}},{'Start_date':{$lte :current_date}}]})
    .sort('Start_date').then(events =>{
    // console.log("check");
        // console.log(events);  
     return res.send(events);
        // res.json({message:"current events fetched successfully",events:events});
        // res.json({events:events});
    }).catch(err=>{
        console.log(err);
    })
    // return res.send(events);
})

router.get('/api/events/upcoming',(req,res)=>{
    var days = 20;
    let current_date = new Date();
    let next_date = new Date(current_date.getTime() +(days * 24 * 60 * 60 * 1000))
    console.log(next_date);
    Event.find({$and:[{'Start_date':{$gte: current_date}},{'Start_date':{$lte: next_date}}]})
    .sort('Start_date').then(events =>{
        console.log(events);
        res.json({events});
    }).catch(err =>{
        console.log(err);
    })
})


router.post('/api/addEvent',(req,res)=>{
    console.log(req.body);
    const{heading,description,website,start_date,end_date,clubId} = req.body;
    if(!heading || !start_date || !end_date || !description) 
        {
           return res.status(422).json({error:"Please Fill all the details"});

        } 
    const event = new Event({
        Title:heading,
        description:description,
        Start_date:start_date,
        End_date:end_date,
        event_webiste:website
    });

    Club.findOne({_id:clubId}).populate('subscribedBy')
        .then( club =>{

        var users = [];
        
        club.subscribedBy.forEach(function (eachuser) {
          users.push(eachuser.email);
        });
        //email for notification of new job
        if (users.length > 0) {
          const output = `
      <p>Greetings from ClubMix,</p>
      <p> An event is soon going to be held organized by ${club.name} Club</p>
      <h3>Event details</h3>
      <h2>${Title}</h2>
      <ul>
      <li><b>Description</b>: ${description} </li>
      <li><b>Start Date</b>: ${Start_Date} </li>
      <li><b>End Date</b>: ${End_Date} </li>
      </ul>
      <p>
      We are looking forward for your particiaption
      </p>
      <p>NOTE: You are receiving this mail because you are subscribed to this page </p>
      `;
          let transporter = nodemailer.createTransport({
            // host: 'mail.google.com',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            //service: 'Gmail',
            auth: {
              user :process.env.PORTAL_MAIL_ID,
              pass :process.env.PORTAL_MAIL_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          let mailOptions = {
            from: '"ClubMix"',
            to: users,
            subject: 'Upcoming Event !!',
            text: '',
            html: output
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (err) {
              console.log(err);
            }
            console.log('Message sent: %s', info.messageId);
            //console.log('Preview Url : %s', nodemailer.getTestMessageUrl(info));
            //res.redirect('/company/' + job.postedBy.id + '/viewjob')
        // console.log(event);
          })
        }

        }).catch ( err => {
            console.log(err);
        })

    event.postedBy.id= clubId;
    event.save().then(event =>{
        console.log(event);
        res.json({message:"saved event successfully",event:{id:event._id}});
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router;
