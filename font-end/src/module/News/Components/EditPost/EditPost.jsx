import React, { useState } from "react";
import { Button, Divider, Input, Modal, Upload } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./CreatePost.scss";
import Title from "antd/lib/typography/Title";
import { onCreatePost } from "../../../../redux/post/post.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
const CreatePost = ({onCreatePost}) => {
	const [input, setInput] = useState("");
	const [link, setLink] = useState("");
	// const [base64List, setbase64List] = useState([]);
	const [previewVisible, setPreviewVisible] = useState(false);
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
	const onChange = (e) => {
		setInput(e.target.value);
	};
	const onClick = () => {
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

	// const onCreate = () =>{
	// 	// console.log('fileList')
	// 	// const images = fileList.map((img)=>img.thumbUrl)
	// 	// onCreatePost({
	// 	// 	title:input,
	// 	// 	image:images,
	// 	// 	url:link,
	// 	// })
	// }

	const onImageChange = ({ fileList: newFileList,file }) => {

        // console.log(getBase64(file))
		setFileList(newFileList);
	};
	const handleCloseReview = () => {
		setPreviewVisible(false);
	};
	const dummyRequest =  async ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};

    const onLinkChange = (e) => {
        setLink(e.target.value)
    }

	const ok = () =>{
		// console.log('ss')
	}

	return (
		<div className="create-post">
			<Button
				size="large"
				shape="round"
				icon={<PlusCircleOutlined />}
				onClick={onClick}
			>
				Thêm Bài Viết
			</Button>
			<Modal visible={isAdd} onCancel={onClose} onOk={ok}>
				<div className="create-post-modal">
                    <Title level={4}>Nội Dung</Title>
					<Input.TextArea
						value={input}
						allowClear
						onChange={onChange}
						placeholder="input your new post"
					/>
                    <Divider/>
                    <Title level={4}>Thêm Hình</Title>
					<Upload
						// action={getBase64}
						// beforeUpload={(a) => false}
						customRequest={dummyRequest}
						name="đ"
						onPreview={handlePreview}
						listType="picture-card"
						fileList={fileList}
						onChange={onImageChange}
					>
						Ảnh
					</Upload>
                    <Divider/>
                    <Title level={4}>Thêm Link Video</Title>
                    <Input value={link} onChange={onLinkChange}></Input>
				</div>
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
	);
};
const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = {
	onCreatePost,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreatePost);;
