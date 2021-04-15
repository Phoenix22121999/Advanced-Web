const router = require('express').Router();
const Post = require('../model/post.model');
const gateToken = require('../middleware/veriFy')

// @router api/posts GET
// dùng để lấy tất cả bài post 

router.get('/', gateToken ,async(req,res)=>{
    const userid = req.userId; // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    try{
        const result = await Post.find({user:userid}).populate('user',['name','email']);
        res.json({success: true , data: result});
    }catch(e){
        res.json({success:false, message: e.message});
    }
})


// @route api/posts POST
// dùng để đăng bài lên
router.post('/', gateToken ,async(req,res)=>{
    const user = req.userId // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    const{title , comment ,url} = req.body;
    // console.log(user,req.body)
    if(!title){
        return res.status(404).json({success:false , message: 'Title is require'})
    }
    try{
        const newPost = new Post({title , comment , url ,user});
        
        await newPost.save();
        // console.log(newPost)

        res.json({success:true, message: "Them thanh Cong",post:newPost})
    }catch(err){
        res.json({success:false, message: e.message})
    }
})
// @router api/posts PUT
// dùng để cập nhật thông tin posts
router.put('/:id', gateToken ,async(req,res)=>{
    const user = req.userId // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    const idPost = req.params.id
    const{title , comment ,url} = req.body;
    // console.log(req.userId , req.body)
    if(!title){
        return res.status(404).json({success:false , message: 'Title is require'})
    }
    try{
        let updated = ({title , comment: comment || ' ' , url});
        console.log(updated,idPost,user)
        const updateCondition = {_id : idPost , user: user};
        updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {new: true}); 
        // console.log(updated);
        if(!updatedPost){
            return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
        }
            return res.json({success:true , message : "update Thanh Cong", data: updatedPost});
    }catch(err){
        res.json({success:false, message: e.message})
    }
})
// @router api/posts DELETE
// dùng để xoa thông tin posts
router.delete('/:id',gateToken, async(req,res)=>{
    const idPost = req.params.id;// tham số truyền vào cùng với đường dẫn
    const user = req.userId; // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    try{
        const deleteCondition = {_id : idPost , user: user};
        const deletedPost = await Post.findByIdAndDelete(deleteCondition);
        if(!deletedPost){
            return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
        }
            return res.json({success:true , message : "Xoa Thanh Cong", data: deletedPost});
    }catch(err){

    }
    // res.json(idPost)
})


module.exports = router