import { Button, Input, message, Form } from "antd";
import React from "react";
import { connect } from "react-redux";
import { onUpdatePassword } from "../../../../redux/user/user.actions";

const AdminAccount = ({onUpdatePassword}) => {
	const [form] = Form.useForm()
	const layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	};
	const tailLayout = {
		wrapperCol: { offset: 21, span: 0 },
	};

	const onFinish = (value) => {
		const { newPassword, newPassword2 } = value;
		if (newPassword === newPassword2) {
            onUpdatePassword(value,onUpdatePasswordCallbacll)
		}else{
            message.error("Password don't match")
        }
	};

    const onUpdatePasswordCallbacll = (isSuccess) => {
        if(isSuccess){
			form.resetFields()
            message.success("Change Password Success")
        }
    }

	return (
		<div>
			<Form
				form={form}
				{...layout}
				name="accountAdmin"
				onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Old Password"
					name="oldPassword"
					rules={[
						{
							required: true,
							message: "Please input your current password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="New Password"
					name="newPassword"
					rules={[
						{
							required: true,
							message: "Please input your new password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="New Password Again"
					name="newPassword2"
					rules={[
						{
							required: true,
							message: "Please input your new password again!",
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
	);
};
// const mapStateToProps = createStructuredSelector({
// });

const mapDispatchToProps = {
	onUpdatePassword
};

export default connect(null, mapDispatchToProps)(AdminAccount);
// export default Admin;
