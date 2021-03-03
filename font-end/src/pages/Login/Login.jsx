import React from "react";
import { connect } from "react-redux";
import "./Login.scss";
import { Form, Input, Button, Checkbox } from "antd";
import { GoogleLogin } from 'react-google-login';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { ROUTES } from "../../utils/constant";
const LoginContainer = ({}) => {
	const cookies = new Cookies();
	let history = useHistory();
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
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const responseGoogle = (value,d1) =>{
		console.log('success',value,d1)

		
		cookies.set('token', value.accessToken, { path: '/' });
		history.push(ROUTES.DASHBOARD)
	}

	return (
		<div className="login-container">
			<div className="form-wrapper">
				<h1>Login</h1>
				<Form
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
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
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
                        {/* <LoginButton/> */}
						<GoogleLogin
							clientId="491877709514-naq9vtgprh86qsun954ti1m21to4l1ro.apps.googleusercontent.com"
							buttonText="Login"
							isSignedIn={true}
							onSuccess={responseGoogle}
							// onFailure={responseGoogle}
							cookiePolicy={'single_host_origin'}
						/>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);
