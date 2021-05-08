import { Divider, Input, Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import Title from "antd/lib/skeleton/Title";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { createStructuredSelector } from "reselect";
import api from "../../api/index.api";
import {
	onDeletePost,
	onGetPosts,
	onUpdatePost,
} from "../../redux/post/post.actions";
import { selectPostList } from "../../redux/post/post.selector";
import Post from "../News/Components/Post/Post";

const Detail = ({ posts, onGetPosts, onDeletePost, onUpdatePost }) => {
	let { id } = useParams();
	useEffect(() => {
		onGetPosts(id);
	}, [id, onGetPosts]);

	const [input, setInput] = useState("");
	const [link, setLink] = useState("");
	const [selectedId, setSelectedId] = useState();
	// const [mode, setMode] = useState(MODE.ADD);
	// const [base64List, setbase64List] = useState([]);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [deleteID, setDeleteID] = useState();
	const [deleteVidible, setDeleteVidible] = useState(false);
	// const [previewVisible, setPreviewVisible] = useState(false);
	const [previewTitle, setPreviewTitle] = useState(false);
	const [previewImage, setPreviewImage] = useState();
	const [isAdd, setIsAdd] = useState(false);
	const [fileList, setFileList] = useState([]);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
		setPreviewVisible(true);
		setPreviewImage(file.url || file.preview);
	};

	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	const handleCloseReview = () => {
		setPreviewVisible(false);
	};

	const onLinkChange = (e) => {
		setLink(e.target.value);
	};

	const edit = (post) => {
		// setSelectedPost(post)
		setFileList(
			post.img.map((img, key) => {
				return {
					uid: key,
					name: `Image ${key + 1}`,
					thumbUrl: img,
					url: img,
					status: "done",
				};
			})
		);
		setInput(post.title);
		setLink(post.url);
		setSelectedId(post._id);
		setPreviewTitle("");
		setIsAdd(true);
	};
	const deletePost = (id) => {
		setDeleteID(id);
		setDeleteVidible(true);
	};

	const handleDeleteClose = () => {
		setDeleteVidible(false);
	};

	const handleDelete = () => {
		onDeletePost(deleteID, onDeleteCallback);
	};

	const onDeleteCallback = (isSuccess) => {
		if (isSuccess) {
			setDeleteVidible(false);
		}
	};
	const onImageChange = ({ fileList: newFileList, file }) => {
		// console.log(getBase64(file))
		setFileList(newFileList);
	};

	const customRequest = async ({ file, onSuccess }) => {
		// console.log(file)
		const rs = await api.uploadApi.methodWithFormData({ image: file });
		onSuccess(rs);
		// setTimeout(() => {
		// 	onSuccess("ok");
		// }, 0);
	};
	const onChange = (e) => {
		setInput(e.target.value);
	};
	// const onClick = () => {
	// 	setMode(MODE.ADD);
	// 	setIsAdd(true);
	// };
	const onClose = () => {
		setIsAdd(false);
	};

	const onCreate = () => {
		const images = fileList.map((img) => img.response.data);
		onUpdatePost({
			title: input,
			image: images,
			url: link,
			id: selectedId,
		});
	};

	return (
		<div>
			{posts &&
				posts.map((post) => {
					return (
						<Post
							key={post._id}
							post={post}
							edit={edit}
							deletePost={deletePost}
						/>
					);
				})}
			<div className="create-post">
				<Modal visible={isAdd} onCancel={onClose} onOk={onCreate}>
					<div className="create-post-modal">
						<Title level={4}>Nội Dung</Title>
						<Input.TextArea
							value={input}
							allowClear
							onChange={onChange}
							placeholder="input your new post"
						/>
						<Divider />
						<Title level={4}>Thêm Hình</Title>
						<Upload
							// action={getBase64}
							// beforeUpload={(a) => false}
							customRequest={customRequest}
							name="đ"
							onPreview={handlePreview}
							listType="picture-card"
							fileList={fileList}
							onChange={onImageChange}
						>
							Ảnh
						</Upload>
						<Divider />
						<Title level={4}>Thêm Link Video</Title>
						<Input value={link} onChange={onLinkChange}></Input>
					</div>
				</Modal>
				<Modal
					visible={deleteVidible}
					onCancel={handleDeleteClose}
					onOk={handleDelete}
				>
					<h4>Delete</h4>
				</Modal>
				<Modal
					visible={previewVisible}
					title={previewTitle}
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
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	posts: selectPostList,
});

const mapDispatchToProps = {
	onGetPosts,
	onDeletePost,
	onUpdatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
// export default Detail;