import {
	Button,
	Card,
	Form,
	Input,
	Modal,
	Pagination,
	Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Notification.scss";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { onCreateNotification, onDeleteNotify,onUpdateNotify } from "../../redux/notification/notification.actions";
import moment from "moment";
import { selectNotificationList } from "../../redux/notification/notification.selector";
import { FACULTY, MODE, ROUTES } from "../../utils/constant";
import { Link } from "react-router-dom";
import { DeleteNotification, EditNotification } from "./ActionNotification/ActionNotification";
const { Option } = Select;
const Notification = ({ user, onCreateNotification, notifications,onDeleteNotify ,onUpdateNotify}) => {
	// moment().format('MMMM Do YYYY, h:mm:ss a');
	const [addNotificationVisible, setAddNotificationVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [mode, setMode] = useState(MODE.ADD);
	const [filterList, setFilterList] = useState(notifications||[]);
	const [editNotify, setEditNotify] = useState();
	const [form] =Form.useForm()
	useEffect(() => {
		setFilterList(notifications)
	}, [notifications])
	const onAddNotificationClick = () => {
		setMode(MODE.ADD)
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
		if(mode===MODE.ADD){
			onCreateNotification(value, onCreateNotificationCallback);
		}else{
			// console.log("ịuhi")
			onUpdateNotify({id:editNotify._id,...value},onCreateNotificationCallback)
		}
	};

	const onCreateNotificationCallback = (isSuccess, rs) => {
		if (isSuccess) {
			setAddNotificationVisible(false);
			form.resetFields()
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
	const onPageChange = (value) => {
		setCurrentPage(value);
	};
	const onEdit = (notify) => {
		setEditNotify(notify)
		form.setFieldsValue(notify)
		setAddNotificationVisible(true)
		setMode(MODE.EDIT)
		// edit(post);
	};
	const onDelete = (notify) => {
		// deletePost(post?._id);
		onDeleteNotify(notify._id)
	};

	return (
		<div className="notification-container">
			<div className="notification-action">
				{!user.name && (
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
						form={form}
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
								{!user.name &&
									user.faculty.map((faculty, index) => {
										return (
											<Option
												key={`${user._id}-${faculty}-${index}`}
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
				{filterList
					?.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
					.map((notification) => {
						// console.log(notification.user.email,notification.user._id,user._id,notification.user._id===user._id)

						return (
							<Card
								key={notification._id}
								title={
									<Link
										to={`${ROUTES.NOTIFY_DETAIL}/${notification._id}`}
									>
										{notification.title}
									</Link>
								}
								// extra={<Dropdown key={notification._id} overlay={menu}> <Button>More</Button> </Dropdown>}
								style={{ marginTop: 16 }}
								actions={notification.user._id===user._id && [<DeleteNotification handleDelete={onDelete} notification={notification}/>, <EditNotification handleEdit={onEdit} notification={notification} />]}
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
			<Pagination
				current={currentPage}
				onChange={onPageChange}
				total={filterList.length}
			/>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
	notifications: selectNotificationList,
});

const mapDispatchToProps = { onCreateNotification,onDeleteNotify ,onUpdateNotify};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
// export default Notification;
