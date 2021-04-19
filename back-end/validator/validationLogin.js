const {check }= require('express-validator');
module.exports = [
    check('email').exists().withMessage('vui lòng nhập email ')
    .notEmpty().withMessage('email Không được để trống')
    .isEmail().withMessage('Email Không hợp lệ'),

    check('password').exists().withMessage('passowrd không được để trống')
    .notEmpty().withMessage('Không để password trống')
    .isLength({min:6}).withMessage('Mật khẩu cần ít nhất 6 ký tự'),
]