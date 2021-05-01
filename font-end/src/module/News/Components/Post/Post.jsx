import { Avatar, Button, Comment, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Carousel from "react-multi-carousel";
import "./Post.scss";
import { Menu, Dropdown } from "antd";
import {MoreOutlined} from '@ant-design/icons';
import { onCreateComment } from '../../../../redux/post/post.actions'
const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const Post = ({ post, edit, deletePost, onCreateComment }) => {
	const [previewVisible, setPreviewVisible] = useState(false);
	const [comment, setComment] = useState('');
	const [previewImage, setPreviewImage] = useState();
	const handleCloseReview = () => {
		setPreviewVisible(false);
	};

	const onImageClick = (image) => {
		setPreviewImage(image);
		setPreviewVisible(true);
	};

	const onEdit = () => {
		edit(post);
	};
	const onDelete = () => {
		deletePost(post._id);
	};

	const menu = (
		<Menu>
			<Menu.Item key="0">
				<div type="primary" danger onClick={onDelete}>
					Delete
				</div>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="1">
				<div type="primary" onClick={onEdit}>
					Edit
				</div>
			</Menu.Item>
		</Menu>
	);

	const onCommentChange = (e) => {
		setComment(e.target.value)
	}

	const handleCreateComment = (e) => {
		console.log('in')
		if(comment.trim()!==""){
			let data = {
				comment
			}
			onCreateComment({data,id:post._id},onCreateCommentCallBack)
		}else{
			message.error("Empty comment")
		}

	}
	const onCreateCommentCallBack = (isSuccess,rs) =>  {
		console.log(rs)
	}

	return (
		<div className="post-wrapper">
			<div className="post-header">
				<div className='post-header-left'>
					<Avatar src={post.user.iamge} />
					<div className="post-username">{post.user.name}</div>
				</div>
				<div className='post-header-right'>
				<Dropdown overlay={menu}>
					<div>
						<MoreOutlined rotate={90}/>
					</div>
				</Dropdown>
				</div>
			</div>
			<div className="post-content">
				<div className="post-text">{post.title}</div>
				<div className="post-images">
					<Carousel
						itemClass="image-wapper"
						arrows
						infinite
						responsive={responsive}
						draggable={false}
						removeArrowOnDeviceType={["mobile"]}
					>
						{post.img &&
							post.img.map((image,index) => {
								return (
									<img
										className="image"
										onClick={() => onImageClick(image)}
										src={image}
										alt="1"
									/>
								);
							})}
					</Carousel>
				</div>
			</div>
			<div className="post-footer">
				<Input placeholder="comment" value={comment} onChange={onCommentChange}/>
				<Button type="primary" danger onClick={handleCreateComment}>
					Comment
				</Button>
				{/* <Button type="primary" onClick={onEdit}>Edit</Button> */}
			</div>
			<div className="post-comment">
				{/* <div className = "post-comment">
					Comment
				</div> */}
				<Comment 
					content={
					<p>
						We supply a series of design principles, practical patterns and high quality design
						resources (Sketch and Axure), to help people create their product prototypes beautifully
						and efficiently.
				  	</p>
				}/>
			</div>
			<Modal
				visible={previewVisible}
				// title={previewTitle}
				footer={null}
				onCancel={handleCloseReview}
			>
				<img
					alt="example"
					style={{ width: "100%" }}
					src={previewImage}
				/>
			</Modal>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {onCreateComment};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
