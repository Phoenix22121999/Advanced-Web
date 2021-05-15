const router = require('express').Router();
const Notify = require('../model/notify.model');
const gateToken = require('../middleware/veriFy')
// const io = require('socket.io')(4000);


// //lấy thông báo của khoa sau khi đăng nhập
// router.get('/',async(req,res)=>{

//     res.json("hahaha")
//     // console.log(io)
//     // const khoaId = req.userId;
//     // try{
//     //     const result = await Notify.find({faculty:khoaId}).populate('faculty',["_id","email","img","faculty"]);
//     //     res.json({success:true , data:result })
//     // }catch(err){
//     //     res.json({success:false , message:err.message })
//     // }
//     // res.json({success: true, message:"welcome my notify Router"})
// })


router.get('/', async (req, res) => {
    // const khoaId = req.userId;
    try {
        // const result = await Notify.find()
        const result = await Notify.find().populate('user', ["_id", "email", "image", "faculty"]);
        res.json({ success: true, data: result })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
    // res.json({success: true, message:"welcome my notify Router"})
})
// lấy thông tin của 1 bài viết 
router.get('/:idNotify', async(req,res)=>{
    const notifyId = req.params.idNotify;
    // console.log(notifyId)
    try{
        const result = await Notify.findOne({_id:notifyId }).populate('user', ["_id", "email", "image", "faculty"]);
        if(Object.values(result).length === 0){
            return res.status(404).json({success:false , message:"Không tìm thấy bài post"})
        }
        return res.json({ success: true, data: result }) 
    }catch(error){
        return res.json({success: false , message: error.mesage})
    }
})
//lấy thông báo của khoa sau khi đăng nhập
// //lấy thông báo của khoa 
router.get('/user/:userId', async (req, res) => {
    const userid = req.params.userId; // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req

    try {
        const result = await Notify.find({ user: userid }).populate('user', ["_id", "email", "image", "faculty"]);
        if(Object.values(result).length === 0){
           return res.status(404).json({success: false , message: "Không tìm thấy"})
        }
        return res.json({ success: true, data: result });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
})



// thêm thông báo của khoa vào thông báo
router.post('/', gateToken, async (req, res) => {
    const khoaId = req.userId;
    var io = req.app.get('socketio');
    
    const { content, title, faculty } = req.body;
    if (!content) {
        return res.status(404).json({ success: false, message: 'Content is require' })
    }
    if (!title) {
        return res.status(404).json({ success: false, message: 'title is require' })
    }
    try {
        const newNotify = new Notify({ title, content, user: khoaId, faculty });
        await newNotify.save();
        const result = await Notify.find({_id: newNotify._id}).populate('user', ["_id", "email", "image", "faculty"]);
        res.json({ success: true, message: "Them Thong Bao Thanh Công", data: result });
        io.emit("message",newNotify);

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
})





//sửa đổi thông báo
router.put('/:idNotify', gateToken, async (req, res) => {
    const idNotify = req.params.idNotify;
    const khoaId = req.userId;
    const { content, title } = req.body;
    if (!title) {
        return res.status(404).json({ success: false, message: 'title is require' })
    }
    if (!content) {
        return res.status(404).json({ success: false, message: 'content is require' })
    }
    try {
        let updateNotify = ({ content, title });
        const updateCondition = { _id: idNotify, user: khoaId };
        console.log(updateCondition)
        updateNotify = await Notify.findOneAndUpdate(updateCondition, updateNotify, { new: true }).populate('user', ["_id", "email", "img", "faculty"]);
        if (!updateNotify) {
            return res.status(401).json({ sucess: false, message: 'Notify not found or not authorized' })
        }
        return res.json({ success: true, message: "update Thanh Cong", data: updateNotify });
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
})
// dùng để xóa thông báo
router.delete('/:idNotify', gateToken, async (req, res) => {
    const idNotify = req.params.idNotify;
    const khoaId = req.userId;
    try {
        const deleteCondition = { _id: idNotify, faculty: khoaId };
        const deletedNotify = await Notify.findByIdAndDelete(deleteCondition);
        if (!deletedNotify) {
            return res.status(401).json({ sucess: false, message: 'Notify not found or not authorized' })
        }
        return res.json({ success: true, message: "Xoa Thanh Cong", data: deletedNotify });
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
})
module.exports = router;