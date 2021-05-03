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
    faculty:[{
        type:String,
        enum: ['Công tác học sinh, sinh viên(CTHSV)',
        'Công Nghệ Thông Tin',
        'Luật',
        'Điện-Điện Tử',
        'Phòng Đại Học',
        'Phòng Sau Đại Học',
        'Phòng Điện Toán và Máy tính',
        'Phòng Khảo Thí và Kiểm Định chất lượng',
        'Phòng Tài Chính',
        'TDT CLC',
        'Trung tâm tin học',
        'Trung tâm đào tạo và phát triển xã hội(SDTC)',
        'Trung tâm phát triển Khoa học quản lý và ứng dụng công nghệ (ATEM)',
        'Trung tâm hợp tác doanh nghiệp và cựu sinh viên',
        'Trung tâm ngoại ngữ - tin học - bồi dưỡng văn hóa',
        'Viện chính sách kinh tế và kinh doanh',
        'Mỹ Thuật Công Nghiệp',
        'Quản Trị Kinh Doanh',
        'Môi Trường và Bảo Hộ Lao Động',
        'Lao Động Công Đoàn',
        'Tài Chính Ngân Hàng',
        'Giáo Dục Quốc Tế',
        'Admin']
    }],
    image:{
        type:Object,
        required: true
    },

});

const Faculty = mongoose.model('faculty', FacultySchema);
module.exports = Faculty;