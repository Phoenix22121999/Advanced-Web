import { List } from "antd";
import React from "react";
import "./NewNoficationList.scss"
const NewNoficationList = ({ notifications }) => {
    // console.log('notifications',notifications)
	const renderItem = (item) => {
        // console.log(item)
		return (
			<List.Item>
				<List.Item.Meta
					// avatar={<Avatar src="" />}
					title={<div>{item.title}</div>}
					description={item.faculty}
				/>
			</List.Item>
		);
	};

	return (
		<div className="new-nofication-list-container">
            <div className="new-nofication-list-header">
                Nofication
            </div>
			<List
				itemLayout="horizontal"
				dataSource={notifications||[]}
				renderItem={renderItem}
			/>
		</div>
	);
};

export default NewNoficationList;
