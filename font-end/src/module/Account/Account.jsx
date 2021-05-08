import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { Button, Form, Input } from "antd";
import "./Account.scss";
const Account = ({ user }) => {
	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
	};
	const tailLayout = {
		wrapperCol: { offset: 21, span: 0 },
	};

	return (
		<div className="account-container">
			<div className="account-user-form">
				<Form
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
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
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
});

const mapDispatchToProps = {
	// onGetProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

// export default Account;
