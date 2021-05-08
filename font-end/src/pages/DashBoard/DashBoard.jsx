import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Layout, Menu, notification } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CLIENT_ID, ROUTES, ROLE, API_URL } from "../../utils/constant";
import { GoogleLogout } from "react-google-login";
import "./DashBoard.scss";
import News from "../../module/News/News";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { onGetProfile } from "../../redux/user/user.actions";
import { UserOutlined } from "@ant-design/icons";
import { getToken, setToken } from "../../utils/function.utils";
import Admin from "../../module/Admin/Admin";
import Account from "../../module/Account/Account";
import Notification from "../../module/Notification/Notification";
import socketIOClient from "socket.io-client";
import moment from 'moment'
import Detail from "../../module/Detail/Detail";
const { Header, Content } = Layout;
const cookies = new Cookies();
const DashBoardContainer = ({ user, onGetProfile }) => {
	
	// let { path, url } = useRouteMatch();
	let history = useHistory();
	const onLogoutSuccess = async () => {
		cookies.remove("token");
		history.push(ROUTES.LOGIN);
	};



	useEffect(() => {
		const onGetProfileCallback = (isSuccess,rs) => {
			if (isSuccess) {
				setToken(rs.access)
				history.push(ROUTES.DASHBOARD);
			}
		}
		if (!user) {
			onGetProfile(getToken(),onGetProfileCallback);
		}
	}, [user, onGetProfile,history]);
	useEffect(() => {
		const socket = socketIOClient(API_URL);
		socket.on("message", data => {
			console.log("data",data)
			if(data.user!==user._id){
				notification.info({
					message: `${data.title}`,
					description:`${data.faculty} - ${moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`
				})
			}
		});
	}, [user]);
	return (
		<Router>
			<div className="dashboard-container">
					<Header>
						<div className="dashboard-header">
							<Menu
								theme="dark"
								mode="horizontal"
								defaultSelectedKeys={[ROUTES.NEWS]}
							>
								<Menu.Item key={ROUTES.NEWS}>
									<Link to={ROUTES.NEWS}>News</Link>
								</Menu.Item>
								<Menu.Item key={ROUTES.ACCOUNT}>
										<Link to={ROUTES.ACCOUNT}>Account</Link>
								</Menu.Item>								
								<Menu.Item key={ROUTES.NOTIFICATION}>
										<Link to={ROUTES.NOTIFICATION}>Notification</Link>
								</Menu.Item>
								{user?.faculty && user.faculty.includes(ROLE.ADMIN) && (
									<Menu.Item key={ROUTES.ADMIN}>
										<Link to={ROUTES.ADMIN}>Admin</Link>
									</Menu.Item>
								)}
								
							</Menu>
							<div className="right">
								{user?.faculty ? (
									<Button
										onClick={onLogoutSuccess}
										// disabled={renderProps.disabled}
									>
										Logout
									</Button>
								) : (
									<GoogleLogout
										clientId={CLIENT_ID}
										buttonText="Logout"
										onLogoutSuccess={onLogoutSuccess}
										render={(renderProps) => (
											<Button
												onClick={renderProps.onClick}
												disabled={renderProps.disabled}
											>
												Logout
											</Button>
										)}
									></GoogleLogout>
								)}

								{user ? (
									<Avatar
										src={
											user?.image?.data?.url ||
											user?.image?.url
										}
									/>
								) : (
									<Avatar icon={<UserOutlined />} />
								)}
							</div>
						</div>
					</Header>
				<Layout className="layout">
					<Content>
						<div className="dashboard-content">
							{user && (
								<Switch>
									<Route exact path={ROUTES.NEWS}>
										<News />
									</Route>
									<Route exact path={ROUTES.DASHBOARD}>
										<News />
									</Route>
									<Route exact path={ROUTES.ADMIN}>
										<Admin />
									</Route>
									<Route exact path={ROUTES.ACCOUNT}>
										<Account />
									</Route>
									<Route exact path={ROUTES.NOTIFICATION}>
										<Notification />
									</Route>
									<Route exact path={`${ROUTES.DETAILL}/:id`}>
										<Detail />
									</Route>
								</Switch>
							)}
						</div>
					</Content>
					
				</Layout>
			</div>
		</Router>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
});

const mapDispatchToProps = {
	onGetProfile,
};

export const DashBoard = connect(
	mapStateToProps,
	mapDispatchToProps
)(DashBoardContainer);
