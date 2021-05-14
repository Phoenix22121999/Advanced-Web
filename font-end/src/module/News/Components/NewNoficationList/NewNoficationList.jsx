import { List } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../utils/constant";
import "./NewNoficationList.scss"
const NewNoficationList = ({ notifications }) => {
    // console.log('notifications',notifications)
	const renderItem = (item) => {
        // console.log(item)
		return (
			<List.Item>
				<List.Item.Meta
					// avatar={<Avatar src="" />}
					title={<Link to={`${ROUTES.NOTIFY_DETAIL}/${item._id}`}><div>{item.title}</div></Link>}
					description={`${item.faculty} - ${moment(item.createdAt).format(
						"MMMM Do YYYY, h:mm:ss a"
					)} `}
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
				dataSource={notifications?.slice(0,10)||[]}
				renderItem={renderItem}
			/>
		</div>
	);
};

export default NewNoficationList;
