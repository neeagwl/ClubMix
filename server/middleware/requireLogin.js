const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = require('../keys');
const User = mongoose.model("User");

module.exports = (req,res,next)=>{
    // console.log("hi");
    const {authorization} = req.headers;
    // authorization === Bearer (token)
    // token is given to user
    console.log(authorization);
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"});
    }
    // console.log("hi1");
     // to access the token
   const token = authorization.replace("Bearer ","");
//    console.log(token);
//    console.log("hi2");
   jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
       if(err){
           return res.status(401).json({error:err});
       }
      const{_id} = payload;
       User.findById(_id).then(userdata=>{
            req.user= userdata;
    // console.log("hi3");
    console.log(req.user);
             next();
       });
   })
}


// // const jwt= require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// // const User = require('../models/User');

// const isLoggedIn = asyncHandler(async(req,res,next)=>{
//     let token;
//     console.log(req.headers.authorization);
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         try{

//             token = req.headers.authorization.split(' ')[1];
//              console.log(token);
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password')

//             next()

//         }catch(e){
//             console.log(e)
//             res.status(401);
//             throw new Error ('No Authorization!')
//         }
//     }
//     if(!token){
//         res.status(401);
//         throw new Error ('No Authorization!')
//     }
// })

// const admin = asyncHandler(async(req,res,next)=>{
//     if(req.user && req.user.isAdmin){
//         next();
//     }else{
//         res.status(401);
//         throw new Error("Not Authorized as an admin.")
//     }
// })

// module.exports= {isLoggedIn}