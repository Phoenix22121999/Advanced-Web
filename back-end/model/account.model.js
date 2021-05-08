const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{ 
        type:String,
        required: true,
        minlength:3
    },
    class:{
        type:String,
    },
    faculty:{
        type:String,
        enum: [
        'Công Nghệ Thông Tin',
        'Luật',
        'Điện-Điện Tử',
        'Mỹ Thuật Công Nghiệp',
        'Quản Trị Kinh Doanh',
        'Môi Trường và Bảo Hộ Lao Động',
        'Lao Động Công Đoàn',
        'Tài Chính Ngân Hàng',
        ]
    },
    image:{
        type:Object,
        required: true
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