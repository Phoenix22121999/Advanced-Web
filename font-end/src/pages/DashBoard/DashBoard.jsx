import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { CLIENT_ID, ROUTES } from "../../utils/constant";
import { GoogleLogout } from "react-google-login";
import "./DashBoard.scss";
import News from "../../module/News/News";
import Cookies from "universal-cookie";
import { useHistory  } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { onGetProfile } from "../../redux/user/user.actions";
import {TOKEN} from "../../utils/constant"
import { UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const DashBoardContainer = ({user, onGetProfile}) => {
	const cookies = new Cookies();
	// let { path, url } = useRouteMatch();
	let history = useHistory();
	const onLogoutSuccess = async ( )=>{
		cookies.remove('token')
		history.push(ROUTES.LOGIN);
	}


	useEffect(() => {
		if(!user){
			onGetProfile(cookies.get(TOKEN))
		}
	}, [user])

	return (
		<Router>
			<div className="dashboard-container">
				<Layout className="layout">
					<Header>
						<div className="dashboard-header">
							<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ROUTES.NEWS]}>
								<Menu.Item key={ROUTES.NEWS}>
									<Link to={ROUTES.NEWS}>News</Link>
								</Menu.Item>
								{/* <Menu.Item key="test">
									<Link to="/test">Test</Link>
								</Menu.Item> */}
								{/* <Menu.Item key="logout"> */}

								{/* </Menu.Item> */}
							</Menu>
							<div className="right">
								<GoogleLogout
									clientId={CLIENT_ID}
									buttonText="Logout"
									onLogoutSuccess={onLogoutSuccess}
									render={(renderProps) => (
										<Button
											ton
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
										>
											Logout
										</Button>
									)}
								></GoogleLogout>
								{user?<Avatar src={user.image}/>:<Avatar icon={<UserOutlined />}/>}
							</div>
						</div>
					</Header>
					<Content style={{ padding: "0 50px" }}>
						<div className="dashboard-content">
							<Switch>
								<Route exact path={ROUTES.NEWS}>
									<News />
								</Route>
								<Route exact path={ROUTES.DASHBOARD}>
									<News />
								</Route>
								{/* <Route exact path={ROUTES.DASHBOARD}>
									<Redirect to={ROUTES.NEWS} /> 
								</Route> */}
							</Switch>
						</div>
					</Content>
				</Layout>
			</div>
		</Router>
	);
};

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
})

const mapDispatchToProps = {
	onGetProfile,
};

export const DashBoard = connect(
	mapStateToProps,
	mapDispatchToProps
)(DashBoardContainer);
