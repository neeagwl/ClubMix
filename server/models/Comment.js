const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const CommentSchema = new mongoose.Schema({
    description: String,
    // comment of which post
    commentOf: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    // who commented
    commentedBy:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    createdAt:{type:Date , default: Date.now}
});
mongoose.model("Comment",CommentSchema);