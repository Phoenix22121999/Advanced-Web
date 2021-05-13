import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
export const DeleteNotification = ({ handleDelete, notification }) => {
	const onClick = () => {
		handleDelete(notification);
	};
	function confirm(e) {
        handleDelete(notification)
	}

	function cancel(e) {
	}
	return (
		// <div onClick={onClick}>
		<Popconfirm
			title="Are you sure to delete this ?"
			onConfirm={confirm}
			onCancel={cancel}
			okText="Yes"
			cancelText="No"
		>
			<DeleteOutlined />
		</Popconfirm>
		// </div>
	);
};
export const EditNotification = ({ handleEdit, notification }) => {
	const onClick = () => {
		handleEdit(notification);
	};
	return (
		<div onClick={onClick}>
			<EditOutlined />
		</div>
	);
};
