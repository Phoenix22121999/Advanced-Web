import { Button, Comment, Input, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
// import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {onGetComment, onCreateComment, onDeleteComment} from '../../../../redux/Comment/comment.actions'
import {selectCurrentUser} from '../../../../redux/user/user.selector'
import DeleteComment from '../DeleteComment/DeleteComment';
import './Comment.scss'
const CommentComponent = ({postId,onGetComment,onCreateComment,user,onDeleteComment}) => {

	const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([])
    useEffect(() => {
        const getComment = async () => {
            let rs = await onGetComment({id:postId})
            setCommentList(rs)        
        }
        getComment()
        
    }, [postId,onGetComment,setCommentList])

	const onCommentChange = (e) => {
		setComment(e.target.value)
	}

    const handleCreateComment = (e) => {
		if(comment.trim()!==""){
			let data = {
				content:comment
			}
			onCreateComment({data,id:postId},onCreateCommentCallBack)
		}else{
			message.error("Empty comment")
		}

	}
	const onCreateCommentCallBack = (isSuccess,rs) =>  {
        if(isSuccess){
            setCommentList([...commentList,...rs])
            setComment('')
        }
	}

    const handleDeleteComent = (commentID) =>{
        onDeleteComment({postID:postId,commentID},deleteCallBack)
    }

    const deleteCallBack = (isSuccess,rs) => {
        if(isSuccess){
            let tmp = commentList.filter((cmt)=>cmt._id!==rs._id)
            setCommentList(tmp)
        }
    }

    return (
        <div className='post-commnent-wrapper'>
            <div className = "post-commnent-input">
                <Input placeholder="comment" value={comment} onChange={onCommentChange}/>
				<Button type="primary" danger onClick={handleCreateComment}>
					Comment
				</Button>
            </div>
            {
                commentList&&commentList.map((cmt,index)=>{
                    return <Comment
                        key={`${cmt.user.name}-${index}`}
                        author={
                            <div className='comment-name'>
                                {
                                    cmt.user.name
                                }
                            </div>
                        }
                        actions={
                            user._id=== cmt.user._id&&[<DeleteComment key={`delete-${index}`} commentID={cmt._id} handleDeleteComent={handleDeleteComent}/>]
                        }
                        avatar={cmt.user?.image?.data.url}
                        content={
                            <p>
                                {cmt.content}
                            </p>
                        }
                    />
                })
            }
            <Modal>

            </Modal>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    user:selectCurrentUser
});

const mapDispatchToProps = {onGetComment,onCreateComment,onDeleteComment};

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent);
