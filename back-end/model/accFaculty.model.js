const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FacultySchema = new Schema({
    email:{
        type: String,
        unique:true,
        sparse:true,
        required: true,
        minlength:3
    },
    password:{
        type: String,
        require:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    faculty:{
        type:String,
        enum: ['Công Nghệ Thông Tin','Dược','Luật','Toán','Kế Toán','Điện','Admin']
    },
    image:{
        type:Object,
        required: true
    },

});

const Faculty = mongoose.model('faculty', FacultySchema);
module.exports = Faculty;