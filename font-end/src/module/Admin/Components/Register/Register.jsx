import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { FACULTY } from "../../../../utils/constant";
import { Upload, message } from "antd";
import { getBase64 } from "../../../../utils/function.utils";
import api from "../../../../api/index.api";
import Modal from "antd/lib/modal/Modal";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { onRegister } from "../../../../redux/user/user.actions";
const { Option } = Select;
const Register = ({onRegister}) => {
	const layout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 16 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};
    const [form] = Form.useForm()
	const [previewImage, setPreviewImage] = useState();
	const [previewTitle, setPreviewTitle] = useState(false);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [fileList, setFileList] = useState([]);
	const customRequest = async ({ file, onSuccess }) => {
		// console.log(file)
		const rs = await api.uploadApi.methodWithFormData({ image: file });
		onSuccess(rs);
		// setTimeout(() => {
		// 	onSuccess("ok");
		// }, 0);
	};
	const beforeUpload = (file) => {
		const isJpgOrPng =
			file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};

	const onAvatarChange = ({ fileList: newFileList, file }) => {
		// console.log(getBase64(file))
		setFileList(newFileList);
	};

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
	const handleCloseReview = () => {
		setPreviewVisible(false);
	};
    const onFinish = (value) =>{
        const {avatar,password2,password,email} = value
        console.log(password2,password)
        if(password2!==password){
            message.error("Password incorrect")
            return
        }
        value.email=email+"@tdtu.edu.vn"
        let picture = avatar?.fileList[0].response.data
        delete value.avatar
        delete value.password2
        value.picture=picture

        onRegister(value,onRegisterCallback)
    }
    const onRegisterCallback = (isSuccess,rs) =>{
        if(isSuccess){
            form.resetFields()
            setFileList([])
            message.success("Success")
        }
    }
	return (
		<div className="register-container">
			<Form
                form={form}
				{...layout}
				name="basic"
				// initialValues={{ remember: true }}
				onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "Please input user email!",
						},
					]}
				>
					<Input  addonAfter="@tdtu.edu.vn"/>
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>
                <Form.Item
					label="Re-password"
					name="password2"
					rules={[
						{
							required: true,
							message: "Please input your password again!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="faculty"
					label="Faculty"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select
						placeholder="Select faculty"
						// onChange={onGenderChange}
						allowClear
					>
						{FACULTY.map((faculty) => {
							return <Option value={faculty}>{faculty}</Option>;
						})}
					</Select>
				</Form.Item>
				<Form.Item
					name="avatar"
					label="Avatar"

					// valuePropName="fileList"
					// getValueFromEvent={normFile}
					// extra="longgggggggggggggggggggggggggggggggggg"
				>
					<Upload
						onPreview={handlePreview}
						customRequest={customRequest}
						name="avatar"
						listType="picture-card"
						beforeUpload={beforeUpload}
						onChange={onAvatarChange}
					>
						{fileList.length < 1 && "+ Upload"}
					</Upload>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
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

});

const mapDispatchToProps = {
    onRegister
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
// export default Register;
