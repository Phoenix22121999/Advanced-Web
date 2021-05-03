import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Notification.scss";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { onCreateNotification } from "../../redux/notification/notification.actions";
const {Option} = Select
const Notification = ({user,onCreateNotification}) => {
	const [addNotificationVisible, setAddNotificationVisible] = useState(false);
	const onAddNotificationClick = () => {
		setAddNotificationVisible(true);
	};
	const onCloseModal = () => {
		setAddNotificationVisible(false);
	};
	
	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const onFinish = (value) =>{
		onCreateNotification(value,onCreateNotificationCallback)
	}

	const onCreateNotificationCallback = (isSuccess,rs) =>{
		if(isSuccess){
			setAddNotificationVisible(false)
		}
	}

	return (
		<div className="notification-container">
			<Button
				size="large"
				shape="round"
				icon={<PlusCircleOutlined />}
				onClick={onAddNotificationClick}
			>
				Thêm Thông Báo
			</Button>
			<Modal visible={addNotificationVisible} onCancel={onCloseModal} footer={null}>
				<div className="notification-form-modal">
					<Form
						{...layout}
						name="basic"
						// initialValues={{ remember: true }}
						onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
					>
						<Form.Item
							label="Title"
							name="title"
							rules={[
								{
									required: true,
									message: "Please input title!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Content"
							name="content"
							rules={[
								{
									required: true,
									message: "Please input content !",
								},
							]}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							label="Faculty"
							name="faculty"
							rules={[
								{
									required: true,
									message: "Please choose faculty !",
								},
							]}
						>
							<Select allowClear>
								{
									user.faculty?.map((faculty)=>{
										return (
										<Option key={`${user._id}-${faculty}`} value={faculty}>
												{
													faculty
												}
											</Option>
										)
									})
								}
							</Select>
						</Form.Item>

						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser
});

const mapDispatchToProps = {onCreateNotification};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
// export default Notification;
