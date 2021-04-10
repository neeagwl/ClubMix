const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const EventSchema = new mongoose.Schema({
    Title: {
        type:String,
        required:true
    },
    event_website :{
        type:String
    },
    data_type :{
        type:String,
        default:"Event"
    },
    Start_date:{
        type:Date,
        required:true
        },
    End_date:{
        type:Date,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    
    // posted by club ka isliye kyuki sirf admin hi access kr skta club ka page toh 
    // user ka reference nahi diya sirf club se kaam chal jaega
    postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Club"
    }
},{
    timestamps:true,
});
mongoose.model("Event",EventSchema);