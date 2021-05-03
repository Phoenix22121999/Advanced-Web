import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Notification.scss";
const Notification = ({}) => {
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
						// onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
					>
						<Form.Item
							label="Username"
							name="username"
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
	// user: selectC,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
// export default Notification;
