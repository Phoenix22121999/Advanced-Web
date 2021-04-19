const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    content:{
        type:String,
        require:true
    },
    timePost: { 
        type : Date, 
        default: Date.now 
    },
})
const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment