import { Button, Comment, Input, message } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {onGetComment, onCreateComment} from '../../../../redux/Comment/comment.actions'
import './Comment.scss'
const CommentComponent = ({postId,onGetComment,onCreateComment}) => {

	const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([])
    useEffect(async () => {
        const rs = await onGetComment({id:postId})
        setCommentList(rs)
        console.log('rs',rs)
    }, [postId])

	const onCommentChange = (e) => {
		setComment(e.target.value)
	}

    const handleCreateComment = (e) => {
		console.log('in')
		if(comment.trim()!==""){
			let data = {
				comment
			}
			onCreateComment({data,id:postId},onCreateCommentCallBack)
		}else{
			message.error("Empty comment")
		}

	}
	const onCreateCommentCallBack = (isSuccess,rs) =>  {
		console.log(rs)
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
                        content={
                            <p>
                                cmt.
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
