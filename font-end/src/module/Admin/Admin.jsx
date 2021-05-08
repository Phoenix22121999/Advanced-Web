import { Tabs } from "antd";
import React from "react";
import Register from "./Components/Register/Register";
const { TabPane } = Tabs;
const Admin = () => {
	return (
		<div className="admin-container">
			<Tabs defaultActiveKey="1" centered>
				<TabPane tab="User Register" key="1">
					<Register/>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default Admin;
