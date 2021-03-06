const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    heading: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    data_type :{
        type:String,
        default:"Post"
    },
    likes:[
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         }
    ],
    comments:[{
        text:String,
        postedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
    }],
    photo:String,
    like:Number,
    createdAt:{type:Date , default: Date.now},
    // posted by club ka isliye kyuki sirf admin hi access kr skta club ka page toh 
    // user ka reference nahi diya sirf club se kaam chal jaega
    postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Club"
    }
});
mongoose.model("Post",PostSchema);