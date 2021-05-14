import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Login.scss";
import { Form, Input, Button, message } from "antd";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { CLIENT_ID, ROUTES } from "../../utils/constant";
import { onLoginWithGoogle, onLogin } from "../../redux/user/user.actions";
import { checkLogin } from "../../utils/function.utils";
const LoginContainer = ({ onLoginWithGoogle, onLogin }) => {
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
		wrapperCol: {
		  span: 24,
		},
	};
	useEffect(() => {
		if (checkLogin()) {
			history.push(ROUTES.DASHBOARD);
		} else {
			history.push(ROUTES.LOGIN);
		}
	}, [history]);

	const responseGoogle = (value) => {
		// console.log("success", value);
		const { profileObj, tokenId } = value;
		const { email } = profileObj;
		if (email.match(regex)) {
			onLoginWithGoogle(tokenId,onLoginCallback);
			// history.push(ROUTES.DASHBOARD);
		} else {
			message.error("Phải đăng nhập bằng mail sinh viên");
		}
	};
	// console.log('render login')
	const onFinish = (value) => {
		onLogin(value, onLoginCallback);
	};

	const onLoginCallback = (isSuccess, rs) => {
		// console.log(isSuccess,rs)
		if (isSuccess) {
			cookies.set("token", rs.access, { path: "/" });
			history.push(ROUTES.DASHBOARD);
		}
	};

	return (
		<div className="login-container">
			<div className="form-wrapper">
				<h1>Login</h1>
				<Form
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					// onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label="Email"
						name="email"
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
						<div className="login-button-group">
							<Button type="primary" htmlType="submit">
							Login
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
	onLoginWithGoogle,
	onLogin,
};

export const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);
