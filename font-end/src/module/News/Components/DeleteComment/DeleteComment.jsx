import { Popconfirm } from "antd";
import React from "react";

const DeleteComment = ({commentID,handleDeleteComent}) => {

    const confirm = ()=>{
        handleDeleteComent(commentID)
    }

	return (
		<Popconfirm
			title="Are you sure to delete this comment?"
			onConfirm={confirm}
			// onCancel={cancel}
			okText="Yes"
			cancelText="No"
		>
			<span>
				Delete
			</span>
		</Popconfirm>
	);
};

export default DeleteComment;
