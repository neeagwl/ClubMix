const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    registration_no :{
        type:String,
        required:true
    },
    notifications : [{
        text:String,
        createdAt:{type:Date , default: Date.now},
        Club_id:String,
        img:String
    }]
},{
    timestamps:true,
});
mongoose.model("User",UserSchema);