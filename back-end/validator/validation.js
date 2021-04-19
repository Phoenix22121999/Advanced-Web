const {check }= require('express-validator');
const litsFaculty = ['Công Nghệ Thông Tin','Dược','Luật','Toán','Kế Toán','Điện']
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