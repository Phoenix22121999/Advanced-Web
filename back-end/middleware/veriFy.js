const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken =(req,res,next)=>{
    const authorToken = req.header('Authorization');
    console.log(authorToken)
    // phần header sẽ được đính kèm header mà người dùng sau khi đăng nhập sẽ được jwt phát cho 1 accesstoken
    // và format là barer token_STring 
    const token = authorToken && authorToken.split(' ')[1];
    // console.log(token);
    if(!token){
        return res.status(404).json({success:false , message : 'Access token not found'});
    }
    try{
        const decode = jwt.verify(token , process.env.ACCESS_TOKEN);
        req.userId = decode.userid;
        next()
    }catch(e){
        return res.status(403).json({sucess:false, message: e.message});
    }
}
module.exports = verifyToken;