import React from "react";
import { connect } from "react-redux";
import "./Login.scss";
import { Form, Input, Button, Checkbox, message } from "antd";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { CLIENT_ID, ROUTES } from "../../utils/constant";
import { onGetProfile } from "../../redux/user/user.actions";
const LoginContainer = ({ onGetProfile }) => {
	const cookies = new Cookies();
	let history = useHistory();
	const regex = new RegExp("@+student.tdtu.edu.vn$", "g");
	const layout = {
		labelCol: {
			span: 8,
		},
		wrapperCol: {
			span: 16,
		},
	};
	const tailLayout = {
		// wrapperCol: {
		//   offset: 8,
		//   span: 16,
		// },
	};
	// const onFinish = (values) => {
	// 	console.log("Success:", values);
	// };

	// const onFinishFailed = (errorInfo) => {
	// 	console.log("Failed:", errorInfo);
	// };

	const responseGoogle = (value) => {
		// console.log("success", value);
		const { profileObj, tokenId } = value;
		const { email } = profileObj;
		console.log(value)
		if (email.match(regex)) {
			cookies.set("token", tokenId, { path: "/" });
			onGetProfile(tokenId);
			history.push(ROUTES.DASHBOARD);
		} else {
			message.error("Phải đăng nhập bằng mail sinh viên");
		}
	};
	// console.log('render login')

	
	return (
		<div className="login-container">
			<div className="form-wrapper">
				<h1>Login</h1>
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

					<Form.Item
						{...tailLayout}
						name="remember"
						valuePropName="checked"
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item {...tailLayout}>
						<div className="login-button-group">
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
							{/* <LoginButton/> */}
							<GoogleLogin
								clientId={CLIENT_ID}
								buttonText="Login"
								// isSignedIn={true}
								onSuccess={responseGoogle}
								// onRequest={onRequest}
								// onFailure={responseGoogle}
								cookiePolicy={"single_host_origin"}
								render={(renderProps) => (
									<Button
										type="default"
										htmlType="submit"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									>
										Login with Google
									</Button>
								)}
							/>
						</div>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	onGetProfile,
};

export const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);
