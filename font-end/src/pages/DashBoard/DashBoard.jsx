import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Layout, Menu, notification } from "antd";
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
import moment from "moment";
import Detail from "../../module/Detail/Detail";
import NotifyDetail from "../../module/NotifyDetail/NotifyDetail";
import { onGetNotificationList } from "../../redux/notification/notification.actions";
// import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { BarsOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
const cookies = new Cookies();
const DashBoardContainer = ({ user, onGetProfile, onGetNotificationList }) => {
	// let { path, url } = useRouteMatch();
	const [selectedKey, setSelectedKey] = useState([ROUTES.NEWS]);
	let history = useHistory();
	const onLogoutSuccess = async () => {
		cookies.remove("token");
		history.push(ROUTES.LOGIN);
	};

	useEffect(() => {
		const onGetProfileCallback = (isSuccess, rs) => {
			if (isSuccess) {
				setToken(rs.access);
				history.push(ROUTES.DASHBOARD);
			}
		};
		if (!user) {
			onGetProfile(getToken(), onGetProfileCallback);
		}
	}, [user, onGetProfile, history]);
	useEffect(() => {
		const socket = socketIOClient(API_URL);
		if (user) {
			socket.on("message", (data) => {
				if (data.user !== user._id) {
					notification.info({
						message: `${data.title}`,
						description: `${data.faculty} - ${moment(
							data.createdAt
						).format("MMMM Do YYYY, h:mm:ss a")}`,
					});
					onGetNotificationList();
				}
			});
		}
	}, [user, onGetNotificationList]);
	const onSelect = ({ key }) => {
		console.log(key);
		setSelectedKey(key);
	};
	const menu = (
		<Menu
			theme="dark"
			mode="horizontal"
			// defaultSelectedKeys={[ROUTES.NEWS]}
			selectedKeys={selectedKey}
			onClick={onSelect}
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
	);
	return (
		<Router>
			<div className="dashboard-container">
				<Header>
					<div className="dashboard-header">
						<div className="dashboard-header-lap">{menu}</div>
						<div className="dashboard-header-phone">
							<Dropdown overlay={menu} placement="bottomLeft">
								<div className="header-icon">
									{" "}
									<BarsOutlined />
								</div>
							</Dropdown>
						</div>
						<div className="right">
							{!user?.name ? (
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
									<Route
										exact
										path={`${ROUTES.NOTIFY_DETAIL}/:id`}
									>
										<NotifyDetail />
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
	onGetNotificationList,
};

export const DashBoard = connect(
	mapStateToProps,
	mapDispatchToProps
)(DashBoardContainer);
