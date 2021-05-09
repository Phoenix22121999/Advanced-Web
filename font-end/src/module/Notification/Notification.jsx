import { Button, Card, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Notification.scss";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { onCreateNotification } from "../../redux/notification/notification.actions";
import moment from "moment";
import { selectNotificationList } from "../../redux/notification/notification.selector";
import { FACULTY, ROUTES } from "../../utils/constant";
import { Link } from "react-router-dom";
const { Option } = Select;
const Notification = ({ user, onCreateNotification, notifications }) => {
	// moment().format('MMMM Do YYYY, h:mm:ss a');
	const [addNotificationVisible, setAddNotificationVisible] = useState(false);
	const [filterList, setFilterList] = useState(notifications);
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

	const onFinish = (value) => {
		onCreateNotification(value, onCreateNotificationCallback);
	};

	const onCreateNotificationCallback = (isSuccess, rs) => {
		if (isSuccess) {
			setAddNotificationVisible(false);
		}
	};

	const onFilterChange = (value) => {
		if (value === "all") {
			setFilterList(notifications);
		} else {
			let tmp = notifications.filter((item) => item.faculty === value);
			setFilterList(tmp);
		}
	};

	return (
		<div className="notification-container">
			<div className="notification-action">
				{user.faculty && (
					<Button
						size="large"
						// shape="round"
						icon={<PlusCircleOutlined />}
						onClick={onAddNotificationClick}
					>
						Thêm Thông Báo
					</Button>
				)}
				<div className="notification-faculty-selecter">
					<Select
						size="large"
						defaultValue="all"
						onChange={onFilterChange}
					>
						<Option value="all">All</Option>
						{FACULTY.map((faculty) => (
							<Option value={faculty}>{faculty}</Option>
						))}
					</Select>
				</div>
			</div>
			<Modal
				visible={addNotificationVisible}
				onCancel={onCloseModal}
				footer={null}
			>
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
								{user.faculty?.map((faculty) => {
									return (
										<Option
											key={`${user._id}-${faculty}`}
											value={faculty}
										>
											{faculty}
										</Option>
									);
								})}
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
			<div className="notification-list">
				{filterList?.map((notification) => {
					return (
						<Card
							title={ <Link to = {`${ROUTES.NOTIFY_DETAIL}/${notification._id}`}>{notification.title}</Link> }
							extra={<div>More</div>}
							style={{ marginTop: 16 }}
						>
							<p>{notification.faculty}</p>
							<p>
								{moment(notification.createdAt).format(
									"MMMM Do YYYY, h:mm:ss a"
								)}
							</p>
						</Card>
					);
				})}
			</div>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
	notifications: selectNotificationList,
});

const mapDispatchToProps = { onCreateNotification };

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
// export default Notification;
