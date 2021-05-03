const {check }= require('express-validator');
const litsFaculty = ['Công tác học sinh, sinh viên(CTHSV)',
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
module.exports = [
    check('email').exists().withMessage('vui lòng nhập email ')
    .notEmpty().withMessage('email Không được để trống')
    .isEmail().withMessage('Email Không hợp lệ'),

    check('password').exists().withMessage('passowrd không được để trống')
    .notEmpty().withMessage('Không để password trống')
    .isLength({min:6}).withMessage('Mật khẩu cần ít nhất 6 ký tự'),

    check('faculty').exists().withMessage('Vui Lòng Điền Tên Khoa')
    .notEmpty().withMessage('Không được bỏ trống Khoa')
    .isIn(litsFaculty).withMessage('Tên khoa không hợp lệ')
]