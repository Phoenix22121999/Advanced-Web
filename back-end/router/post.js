const router = require('express').Router();
const Post = require('../model/post.model');
const Comment = require('../model/comment.model');
const gateToken = require('../middleware/veriFy')


//-------------------------------------------------------------BINH LUAN--------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//@router get comment len bai viet;
router.get('/:id/comment', async(req,res)=>{
    const postId = req.params.id;
    try{
        const result = await Comment.find({post:postId}).populate('user').populate('faculty');
        //const result = await Comment.find({post:postId}).populate('post').populate('user');
        res.json({success:true, data:result});
    }catch(err){
        res.json({success:false, message:err.message})
    }
})
//@route post comment lên bài viết
router.post('/:id/comment',gateToken,async(req,res)=>{
    const postId = req.params.id;
    const userId = req.userId;
    const {content} = req.body;
    try{
        const post = await Post.find({_id:postId});
        if(!post){
           return  res.status(400).json({success: false, message:"Khong tim thay bai viet"} )
        }
        const newComment = new Comment({user:userId,faculty:userId , post: postId ,content});
        await newComment.save();
        const result = await Comment.find({_id: newComment._id}).populate('user').populate('faculty');
        res.json({success:true, message:"Comment thanh Cong", data: result});
    }catch(err){
        res.json({success:false, message: e.message})
    }
})
//@route api/{id của bài viết}/comment/{id của comment lấy sau khi add comment vào trong moongose}
// dùng để cập nhật lại comment của người dùng
router.put('/:PostId/comment/:CommentId',gateToken, async(req,res)=>{
    const userId = req.userId;
    const CommentId = req.params.CommentId;
    const{content} = req.body;
    if(!content){
        return res.status(404).json({success:false , message: 'Content is require'})
    }
    try{
        let updatedComment = ({content});
        const updateCondition = {_id :CommentId , user: userId};
        updatedComment = await Comment.findOneAndUpdate(updateCondition, updatedComment, {new: true}); 
        if(!updatedComment){
            return res.status(401).json({sucess: false , message : 'Comment not found or not authorized'})
        }
            return res.json({success:true , message : "update Thanh Cong", data: updatedComment});
    }catch(err){
        res.json({success:false, message: err.message})
    }
    //res.json({success:true, data:{idPost, idComment}});
})
//@route api/{id của bài viết}/comment/{id của comment lấy sau khi add comment vào trong moongose}
// dùng để xóa comment

router.delete('/:PostId/comment/:CommentId',gateToken, async(req,res)=>{
    const CommentId = req.params.CommentId;// tham số truyền vào cùng với đường dẫn
    const userId = req.userId;// sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    try{
        const deleteCondition = {_id : CommentId , user: userId};
        const deletedComment = await Comment.findByIdAndDelete(deleteCondition);
        if(!deletedComment){
            return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
        }
            return res.json({success:true , message : "Xoa Thanh Cong", data: deletedComment});
    }catch(err){
        res.json({success:false, message: err.message})
    }   
    // res.json(idPost)
})

//-------------------------------------------------------------BÀI VIẾT--------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

// @router api/posts GET
// dùng để lấy tất cả bài post 
router.get('/getAll', async(req,res)=>{
    try{
        const result = await Post.find().populate('user');
        res.json({success:true, data:result})
    }catch(error){
        res.json({success:false, message: error.message })
    }
})
//@router api/posts
router.get('/:postId', async(req,res)=>{
    const postid = req.params.postId;
    try{
        const result = await Post.findOne({_id: postid});
        if(Object.values(result).length === 0){
            return res.status(404).json({success: false , message: "Post not found"});
        }
        res.json({success: true , data: result});
    }
    catch(error){
        res.json({success:false , message: error.message})
    }
})

//@ router api/posts/ :userId 
// dùng để lấy tất cả bài viết của user đó
router.get('/user/:userId' ,async(req,res)=>{
    const userid = req.params.userId; // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    try{
        const result = await Post.find({user:userid}).populate('user');
        if(Object.values(result).length === 0){
            return res.status(404).json({success:false , message: "Không tìm thấy các bài post của user này"})
        }
        res.json({success: true , data: result});
    }catch(error){
        res.json({success:false, message: err.message});
    }
})
// @route api/posts POST
// dùng để đăng bài lên
router.post('/', gateToken ,async(req,res)=>{
    const userid = req.userId // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    const{title,url, image} = req.body;
    // console.log(user,req.body)
    // console.log(req.body);
    if(!title){
        return res.status(404).json({success:false , message: 'Title is require'})
    }
    try{
        const newPost = new Post({title ,img:image,url,user:userid});
        await newPost.save();
        const result = await Post.find({_id: newPost._id}).populate('user')
        // console.log(result)
        res.json({success:true, message: "Them thanh Cong",post: result})
    }catch(err){
        res.json({success:false, message: err.message})
    }
})
// @router api/posts PUT
// dùng để cập nhật thông tin posts
router.put('/:id', gateToken ,async(req,res)=>{
    const user = req.userId // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    const idPost = req.params.id
    const{title ,url,image:img} = req.body;
    if(!title){
        return res.status(404).json({success:false , message: 'Title is require'})
    }
    try{
        let updatedPost = ({title ,img, url});
        const updateCondition = {_id : idPost , user: user};
        updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {new: true}).populate('user',['name','email','_id','image']); 
        if(!updatedPost){
            return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
        }
            return res.json({success:true , message : "update Thanh Cong", data: updatedPost});
    }catch(err){
        res.json({success:false, message: err.message})
    }
})
// @router api/posts DELETE
// dùng để xoa thông tin posts
router.delete('/:id',gateToken, async(req,res)=>{
    const idPost = req.params.id;// tham số truyền vào cùng với đường dẫn
    const user = req.userId; // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    try{

        // const deletedPost = await Post.findByIdAndDelete({ _id : idPost , user: req.userId});
        const deleteCondition = { _id : idPost , user: user};
        const deletedPost = await Post.findOneAndRemove(deleteCondition);
        // console.log(deletedPost)
        if(!deletedPost){
            return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
        }
            return res.json({success:true , message : "Xoa Thanh Cong", data: deletedPost});
    }catch(err){
        res.json({success:false, message: err.message})
    }   
    //res.json(idPost)
})

module.exports = router