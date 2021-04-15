const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{ 
        type:String,
        required: true,
        minlength:3
    },
    image:{
        type: String,
        required: true,
        minlength:3
    },
    email:{
        type: String,
        unique:true,
        sparse:true,
        required: true,
        minlength:3
    }
},{
    timestamps: true,
});

const User = mongoose.model('users', userSchema);
module.exports = User;