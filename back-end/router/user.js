const Router = require('express').Router();
const User = require('../model/account.model');
const Faculty = require('../model/accFaculty.model');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const gateRegister = require('../validator/validation');
const gateLogin = require('../validator/validationLogin');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

// CLIENT_ID sẽ được lấy từ google API để gọi đến dịch vụ API 
const CLIENT_ID = '785675406531-6jj2vfqpm5m06803lo5sph9ifdlgtsf6.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

Router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

Router.post('/login/googleapi', (req, res) => {
  let token = req.body.token;
  // console.log(token);
  // var newUser;
  if (!token) {
    return res.status(400).json({ success: false, message: "Vui Long Nhap Token" });
  }
  // function verify này dùng để nhận token từ google thông qua login với google mail 
  // sau đó từ token ta thông qua hàm verifyidToken sẽ truyền vào đó token ta nhận được cùng với cái client ID 
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // res.cookie('session-token', token);
    // res.json({ code: 1, data: payload });
    const email = payload['email'];
    // console.log(payload)
    try {
      const user = await User.findOne({ email })
      //console.log(user);
      if (user) {
        //return res.status(400).json({success:false,message:"Email already token"});
        const accesToken = jwt.sign({ userid: user._id }, process.env.ACCESS_TOKEN);
        return res.json({ success: true, data: user, access: accesToken });
      }
      var name = payload['name'];
      var image = payload['picture'];
      const newUser = new User({ name, image, email });
      // console.log(email,name,image)
      await newUser.save();
      // const accessToken = jwt.sign({userId:newUser._id});
      const accesToken = jwt.sign({ userid: newUser._id }, process.env.ACCESS_TOKEN);
      return res.json({ succes: true, message: 'User added!', data: newUser, access: accesToken});
    } catch (error) {
      return res.status(400).json('Error: ' + error)
    }
  }
  verify()
});

//router post register dùng để đăng ký tên người dùng chỉ do admin khởi tạo với các giá trị
// email , password , picture , faculty  
Router.post('/register',gateRegister, async (req, res) => {
  // console.log(req.body);
  let result = validationResult(req);
  if (result.errors.length === 0) {
    let { email, password, picture, faculty } = req.body;

    try {
      // tìm xem khoa đó đã tồn tại bên trong database hay chưa
      const facul = await Faculty.findOne({ email });
      if (facul) {
        return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' });
      }
      // nếu không có thì sẽ tạo mới khoa đó với tài khoản
      let hashed = bcrypt.hashSync(password, 10);
      let newFaculty = new Faculty({
          email: email,
          password: hashed,
          img: picture ,
          faculty: faculty
      })
      // console.log(newFaculty)
      await newFaculty.save();
      // sau khi đợi tài khoản của khoa được khởi tạo và lưu vào database thì server sẽ trả về cho cho người dùng 1 token ID được ký với sercet key
      const accesToken = jwt.sign({ userid: newFaculty._id }, process.env.ACCESS_TOKEN);
      return res.json({ success: true, message: 'User added!', data: newFaculty, access: accesToken });
    }catch(err){
      return res.status(400).json('Error: ' + error)
    }
  }else {
    let values = result.mapped();
    let mess = '';
    for (i in values) {
      mess = values[i].msg;
    }
    res.json({ success:true, message: mess })
  }
})

//router post Login sẽ được gọi khi các khoa đăng nhập vào hệ thống với tài khoản của khoa
Router.post('/login',gateLogin,async(req,res)=>{
  let result = validationResult(req);
  if (result.errors.length === 0) {
    let { email, password} = req.body;
    console.log(email,password);
    try{
      const facul = await Faculty.findOne({ email });
      if(!facul){
        return res.status(400).json({success: false, message:"email or pass không đúng" });
      }
      let hashed = bcrypt.hashSync(password, 10);
      let validaPass = bcrypt.compareSync( password , facul.password);
      if(!validaPass){
        return res.status(400).json({success:false , message:"email or pass không đúng"})
      }

      const accesToken = jwt.sign({ userid: facul._id }, process.env.ACCESS_TOKEN);
      return res.json({ success: true, message: 'Login Success', data: facul , access: accesToken });
    }catch(err){
      return res.status(400).json('Error: ' + error)
    }
  }else{
    let values = result.mapped();
    let mess = '';
    for (i in values) {
      mess = values[i].msg;
    }
    res.json({ code: 1, message: mess })
  }
})
module.exports = Router;