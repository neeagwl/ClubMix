const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model("User");
const Club= mongoose.model("Club");
const Comment= mongoose.model("Comment");
const  Post= mongoose.model("Post");
const  Event= mongoose.model("Event");



const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const  requireLogin = require('../middleware/requireLogin');

router.post('/api/signup',(req,res)=>{
    console.log(req.body);
    const {name,email,password,registration_no} = req.body;
    if(!email || !password || !name || !registration_no)
    {
       return res.status(422).json({error:"Please add all the fields"});
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
       return res.status(422).json({error:"User exist"});
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
        
            const user = new User({
                email,
                name,
                password:hashedpassword,
                registration_no
            });
            user.save().then(user=>{
                res.json({message:"saved successfully", email, registration_no})
            }).catch(err=>{
                console.log(err);
            });
        });
    }).catch(err=>{
        console.log(err);
    });
});

router.post('/api/login',(req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"});
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"});
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"});
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,name,email,registration_no} = savedUser
                res.json({token:token,message:"successfully signed in",user:{_id,name
                    ,email,registration_no}});
            }
            else{
                return res.status(422).json({error:"Invalid email or password"});
            }

        }).catch(err=>{
            console.log(err);
        });
    });
});



module.exports = router;