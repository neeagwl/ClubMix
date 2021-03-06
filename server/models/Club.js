const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const ClubSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    event_count:{
       type:Number,
       default:0
    },
    post_count:{
        type:Number,
        default:0
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
// Basketball - 101
// Football - 102
// Footprints - 103
// Arts - 104
// Dance - 105
// Robotics - 106
// CC - 107
// Enactus - 108
// Rotaract - 109