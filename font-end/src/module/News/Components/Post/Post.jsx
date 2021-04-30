import { Avatar, Modal } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Carousel from "react-multi-carousel";
import "./Post.scss";
import { Menu, Dropdown } from "antd";
import {MoreOutlined} from '@ant-design/icons';
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

const Post = ({ post, edit, deletePost }) => {
	const [previewVisible, setPreviewVisible] = useState(false);
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
							post.img.map((image) => {
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
				{/* <Button type="primary" danger onClick={onDelete}>
					Delete
				</Button>
				<Button type="primary" onClick={onEdit}>Edit</Button> */}
			</div>
			<div className="post-comment">
				<div className = "post-comment">
					Comment
				</div>
				{/* <Button type="primary" danger onClick={onDelete}>
					Delete
				</Button>
				<Button type="primary" onClick={onEdit}>Edit</Button> */}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
