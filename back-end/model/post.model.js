const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    comment: {
        type:String,
    },
    url:{
        type:String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model('Post', postSchema )