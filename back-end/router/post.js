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
        const result = await Comment.find({post:postId}).populate('post').populate('user',['name','email']);
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
        const newComment = new Comment({user:userId , post: postId ,content});
        await newComment.save();
        res.json({success:true, message:"Comment thanh Cong", data:newComment});
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
router.get('/', gateToken ,async(req,res)=>{
    const userid = req.userId; // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    try{
        const result = await Post.find({user:userid}).populate('user');
        res.json({success: true , data: result});
    }catch(err){
        res.json({success:false, message: err.message});
    }
})
// @route api/posts POST
// dùng để đăng bài lên
router.post('/', gateToken ,async(req,res)=>{
    const user = req.userId // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    const{title , comment ,url, image} = req.body;
    // console.log(user,req.body)
    // console.log(req.body);
    if(!title){
        return res.status(404).json({success:false , message: 'Title is require'})
    }
    try{
        const newPost = new Post({title , comment ,img:image,url,user});
        
        await newPost.save();
        // console.log(newPost)

        res.json({success:true, message: "Them thanh Cong",post:newPost})
    }catch(err){
        res.json({success:false, message: err.message})
    }
})
// @router api/posts PUT
// dùng để cập nhật thông tin posts
router.put('/:id', gateToken ,async(req,res)=>{
    const user = req.userId // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
    const idPost = req.params.id
    const{title ,url,image} = req.body;
    console.log(req.userId , req.body)
    if(!title){
        return res.status(404).json({success:false , message: 'Title is require'})
    }
    try{
        let updatedPost = ({title ,image, url});
        const updateCondition = {_id : idPost , user: user};
        updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {new: true}).populate('user',['name','email','_id','image']); 
        // console.log(updated);
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
        const deleteCondition = {_id : idPost , user: user};
        const deletedPost = await Post.findByIdAndDelete(deleteCondition);
        if(!deletedPost){
            return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
        }
            return res.json({success:true , message : "Xoa Thanh Cong", data: deletedPost});
    }catch(err){
        res.json({success:false, message: err.message})
    }   
    // res.json(idPost)
})

module.exports = router