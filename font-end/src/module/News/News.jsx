import { Button, Divider, Input, message, Upload } from "antd";
import "./News.scss";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
	onCreatePost,
	onDeletePost,
	onGetPostList,
	onUpdatePost,
} from "../../redux/post/post.actions";
import { selectPostList } from "../../redux/post/post.selector";
import { selectToken } from "../../redux/user/user.selector";
import Post from "./Components/Post/Post";
import { PlusCircleOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { MODE } from "../../utils/constant";
import api from "../../api/index.api";
import { selectNotificationList } from "../../redux/notification/notification.selector";
import { onGetNotificationList } from "../../redux/notification/notification.actions";
import Sider from "antd/lib/layout/Sider";
import Layout, { Content } from "antd/lib/layout/layout";
import NewNoficationList from "./Components/NewNoficationList/NewNoficationList";
import { turnLinkToEmbed } from "../../utils/function.utils";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
const News = ({
	posts,
	onGetPostList,
	onUpdatePost,
	onDeletePost,
	onCreatePost,
	notifications,
	onGetNotificationList,
}) => {
	useEffect(() => {
		if (!posts) {
			onGetPostList();
		}
	}, [posts, onGetPostList]);

	useEffect(() => {
		if (!notifications) {
			onGetNotificationList();
		}
	}, [notifications, onGetNotificationList]);

	const [input, setInput] = useState("");
	const [link, setLink] = useState("");
	const [selectedId, setSelectedId] = useState();
	const [mode, setMode] = useState(MODE.ADD);
	// const [imageList, setImageList] = useState();
	// const [base64List, setbase64List] = useState([]);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [deleteID, setDeleteID] = useState();
	const [deleteVidible, setDeleteVidible] = useState(false);
	// const [previewVisible, setPreviewVisible] = useState(false);
	const [previewTitle, setPreviewTitle] = useState(false);
	const [previewImage, setPreviewImage] = useState();
	const [isAdd, setIsAdd] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [postNum, setPostNum] = useState(10);

	const onBottom = () => {
		console.log("aaa")
		if (postNum < posts.length) {
			message.info("Loading new post");
			setTimeout(onSetPostNum, 1000);
		}
	};
	const onSetPostNum = () => {
		setPostNum(postNum + 10);
		message.success("Load more post success");
	};

	useBottomScrollListener(onBottom, {
		offset: 10,
		debounce: 100,
	});
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
	const onChange = (e) => {
		setInput(e.target.value);
	};
	const onClick = () => {
		setMode(MODE.ADD);
		setIsAdd(true);
	};
	const onClose = () => {
		setIsAdd(false);
	};

	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	const onCreate = () => {
		if (mode === MODE.ADD) {
			// console.log('add',fileList)
			const images = fileList.map((img) => img.response.data);
			onCreatePost(
				{
					title: input,
					image: images,
					url: turnLinkToEmbed(link),
				},
				onCreateSuccess
			);
		} else {
			const images = fileList.map((img) => img.response.data);
			onUpdatePost({
				title: input,
				image: images,
				url: turnLinkToEmbed(link),
				id: selectedId,
			});
		}
	};

	const onCreateSuccess = (isSuccess) => {
		if (isSuccess) {
			setIsAdd(false);
		}
	};

	const onImageChange = ({ fileList: newFileList, file }) => {
		// console.log(getBase64(file))
		setFileList(newFileList);
	};
	const handleCloseReview = () => {
		setPreviewVisible(false);
	};
	const customRequest = async ({ file, onSuccess }) => {
		// console.log(file)
		const rs = await api.uploadApi.methodWithFormData({ image: file });
		onSuccess(rs);
		// setTimeout(() => {
		// 	onSuccess("ok");
		// }, 0);
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
					thumbUrl: img.data.image.url,
					url: img.data.image.url,
					response: { data: img },
					status: "done",
				};
			})
		);
		// setImageList(post.img)
		setInput(post.title);
		setLink(post.url);
		setMode(MODE.EDIT);
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
	// console.log(alertOnBottom)
	// const handleContainerOnBottom = useCallback(() => {
	// 	console.log('I am at bottom in optional container! ' + Math.round(performance.now()));

	// 	if (alertOnBottom) {
	// 	  alert('Bottom of this container hit!');
	// 	}
	//   }, [alertOnBottom]);
	// const ref = useBottomScrollListener(handleContainerOnBottom)
	return (
		<div className="news-container">
			{/* <CreatePost/> */}
			<Layout>
				<Layout>
					<Content className="news-contents">
						<Button
							size="large"
							shape="round"
							icon={<PlusCircleOutlined />}
							onClick={onClick}
						>
							Thêm Bài Viết
						</Button>
						<Divider />
						{posts &&
							posts.slice(0, postNum).map((post) => {
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
							<Modal
								visible={isAdd}
								onCancel={onClose}
								onOk={onCreate}
							>
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
									<Input
										value={link}
										onChange={onLinkChange}
									></Input>
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
					</Content>
				</Layout>
				<Sider
					className="site-layout-background"
					// width={300}
				>
					<NewNoficationList notifications={notifications}/>
				</Sider>
			</Layout>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	token: selectToken,
	posts: selectPostList,
	notifications: selectNotificationList,
});

const mapDispatchToProps = {
	onGetPostList,
	onCreatePost,
	onUpdatePost,
	onDeletePost,
	onGetNotificationList,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
// export default News;
