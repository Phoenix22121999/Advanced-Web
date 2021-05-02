import { Button, Comment, Input, message } from 'antd';
// import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {onGetComment, onCreateComment} from '../../../../redux/Comment/comment.actions'
import './Comment.scss'
const CommentComponent = ({postId,onGetComment,onCreateComment}) => {

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
    return (
        <div className='post-commnent-wrapper'>
            <div className = "post-commnent-input">
                <Input placeholder="comment" value={comment} onChange={onCommentChange}/>
				<Button type="primary" danger onClick={handleCreateComment}>
					Comment
				</Button>
            </div>
            {
                commentList&&commentList.map((cmt)=>{
                    return <Comment
                        avatar={cmt.user?.image?.data.url}
                        content={
                            <p>
                                {cmt.content}
                            </p>
                        }
                    />
                })
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {onGetComment,onCreateComment};

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent);
