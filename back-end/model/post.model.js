const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    img:[{
        type:Object,
    }],
    url:{
        type:String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    timePost: { 
        type : Date, 
        default: Date.now 
    },

})
const Posts = mongoose.model('posts', postSchema);
module.exports = Posts