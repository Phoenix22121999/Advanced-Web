import { Button, Form, Input, message, Modal, Select, Upload } from 'antd';
import { getBase64 } from "../../../../utils/function.utils";
import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import api from '../../../../api/index.api';
import { selectCurrentUser } from '../../../../redux/user/user.selector';
import { onUpdateUser } from '../../../../redux/user/user.actions';
import { USER_FACULTY } from '../../../../utils/constant';
const { Option } = Select;

const UserAccount = ({user,onUpdateUser}) => {
    const [form] = Form.useForm()
    const [previewImage, setPreviewImage] = useState();
    const [image, setImage] = useState();
	const [previewTitle, setPreviewTitle] = useState(false);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [fileList, setFileList] = useState([]);
	const layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	};
	const tailLayout = {
		wrapperCol: { offset: 21, span: 0 },
	};
    useEffect(() => {
        let {image} = user
        setImage(image)
        setFileList([
            {
                uid: "id avatar",
                name: `Image avatar`,
                thumbUrl: image?.data.image.url,
                url: image?.data.image.url,
                status: "done",
            }
        ])
        form.setFieldsValue(user)
    }, [user,form])
    const onFinish = (value) => {
        // console.log(value)
		onUpdateUser({image,...value},onUpdateUserCallback)
	};

    const onUpdateUserCallback = (isSuccess,rs) => {
        if(isSuccess){
            message.success("Update Success")
        }
    }

    // const onUpdatePasswordCallbacll = (isSuccess) => {
    //     // if(isSuccess){
	// 	// 	form.resetFields()
    //     //     message.success("Change Password Success")
    //     // }
    // }
    const customRequest = async ({ file, onSuccess }) => {
		// console.log(file)
		const rs = await api.uploadApi.methodWithFormData({ image: file });
        setImage(rs.data)
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


    return (
        <div>
            <Form
                // initialValues={initValue}
				form={form}
				{...layout}
				name="accountUser"
				onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
			>
                <Form.Item
					label="Username"
					name="name"
                    rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Class"
					name="userClass"
					// rules={[
					// 	{
					// 		required: true,
					// 		message: "Please input your username password!",
					// 	},
					// ]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Faculty"
					name="faculty"
				>
					<Select
						placeholder="Select faculty"
						// onChange={onGenderChange}
						allowClear
						// mode="multiple"
					>
						{USER_FACULTY.map((faculty) => {
							return <Option key={faculty} value={faculty}>{faculty}</Option>;
						})}
					</Select>
				</Form.Item>
				<Form.Item
					label="Image"
					// name="image"
					// rules={[
					// 	{
					// 		required: true,
					// 		message: "Please input your new password again!",
					// 	},
					// ]}
				>
					<Upload
						onPreview={handlePreview}
						customRequest={customRequest}
						name="image"
						listType="picture-card"
						beforeUpload={beforeUpload}
						onChange={onAvatarChange}
                        fileList={fileList}
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
}
const mapStateToProps = createStructuredSelector({
    user:selectCurrentUser
});

const mapDispatchToProps = {
	onUpdateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
// export default UserAccount;
