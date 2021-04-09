const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const ClubSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    website_link:{
        type:String
    },
    insta_link:{
        type:String
    },
    facebook_link:{
        type:String
    },
    twitter_link:{
        type:String
    },
    logo:{
        type:String
    },
    clubType:{
        type:String,
        required:true
    },
    clubAdmin:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    subscribedBy:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    // not sure of date type
    date_of_establishment:{
        type:Date
    },
    contact_number:{
        type:Number
    },
    club_email:{
        type:String
    }
},
{
    timestamps:true,
});
mongoose.model("Club",ClubSchema);