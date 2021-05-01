const router = require('express').Router();
const Notify = require('../model/notify.model');
const gateToken = require('../middleware/veriFy')

//lấy thông báo của khoa sau khi đăng nhập
router.get('/',gateToken,async(req,res)=>{
    const khoaId = req.userId;
    try{
        const result = await Notify.find({faculty:khoaId}).populate('faculty',["_id","email","img","faculty"]);
        res.json({success:false , data:result })
    }catch(err){
        res.json({success:false , message:err.message })
    }
    // res.json({success: true, message:"welcome my notify Router"})
})
// thêm thông báo của khoa vào thông báo
router.post('/',gateToken, async(req,res)=>{
    const khoaId = req.userId;
    const {content , title} = req.body;
    if(!content){
        return res.status(404).json({success:false , message: 'Content is require'})
    }
    if(!title){
        return res.status(404).json({success:false , message: 'title is require'})
    }
    try{
        const newNotify = new Notify({title,content,faculty:khoaId});
        await newNotify.save();
        res.json({success:true , message: "Them Thong Bao Thanh Công",data:newNotify});
    }catch(err){
        res.json({success:false , message:err.message })
    }
})
router.put('/:idNotify',gateToken, async(req,res)=>{
    const idNotify = req.params.idNotify;
    const khoaId = req.userId;
    const {content , title} = req.body;
    if(!title){
        return res.status(404).json({success:false , message: 'title is require'})
    }
    if(!content){
        return res.status(404).json({success:false , message: 'content is require'})
    }
    try{
        let updateNotify = ({content , title});
        const updateCondition = {_id : idNotify , faculty:khoaId };
        updateNotify = await Notify.findOneAndUpdate(updateCondition, updateNotify, {new: true}).populate('faculty',["_id","email","img","faculty"]); 
        if(!updateNotify){
            return res.status(401).json({sucess: false , message : 'Notify not found or not authorized'})
        }
        return res.json({success:true , message : "update Thanh Cong", data: updateNotify});
    }catch(err){
        res.json({success:false, message: err.message})
    }
})
router.delete('/:idNotify',gateToken,async(req,res)=>{
    const idNotify = req.params.idNotify;
    const khoaId = req.userId;
    try{
        const deleteCondition = {_id : idNotify , faculty:khoaId };
        const deletedNotify = await Notify.findByIdAndDelete(deleteCondition);
        if(!deletedNotify){
            return res.status(401).json({sucess: false , message : 'Notify not found or not authorized'})
        }
            return res.json({success:true , message : "Xoa Thanh Cong", data: deletedNotify});
    }catch(err){
        res.json({success:false, message: err.message})
    }   
})
module.exports = router;