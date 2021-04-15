const router = require('express').Router();
let User = require('../model/account.model');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const CLIENT_ID = '785675406531-6jj2vfqpm5m06803lo5sph9ifdlgtsf6.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

router.route('/').get(function(req, res){
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/login').post(function(req, res){
    let token = req.body.token;
    // console.log(token);
    // var newUser;
    if(!token){
      return res.status(400).json({success:false,message:"Vui Long Nhap Token"});
    }
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
      const user = await User.findOne({email})
      //console.log(user);
      if(user){
        //return res.status(400).json({success:false,message:"Email already token"});
        const accesToken = jwt.sign({userid: user._id},process.env.ACCESS_TOKEN);
        return res.json({success:true , data:user, access:accesToken});
      }
      var name = payload['name'];
      var image = payload['picture'];
      const newUser= new User({name,image,email});
      // console.log(email,name,image)
      await newUser.save();
      // const accessToken = jwt.sign({userId:newUser._id});
      const accesToken = jwt.sign({userid: newUser._id},process.env.ACCESS_TOKEN);
      return res.json({succes:true ,message:'User added!',data:newUser, access: accesToken});
      } catch (error) {
        return res.status(400).json('Error: ' + error)
      }
    }
  verify()  
  //     .then(function(){ })
  //     .catch(function(err) {});
    // newUser.save()
    //   .then(function(){ return res.json('User added!')})
    //   .catch(function(err) {return res.status(400).json('Error: ' + err)});
  });
  // router.route('/login').post(async(req,res)=>{
  //   // res.send('login');
  //   let token = req.body.token;
  //   // let email = req.body.email;

    



  //   try {
  //     const user = await User.findOne({email});
  //     if(!user){
  //       return res.status(400).json({suc: false, message:'wrong'})
  //     }
  //     return res.json({suc:true, message:'login complete'})
  //     } catch (error) {
        
  //     }

  // })
  module.exports = router;