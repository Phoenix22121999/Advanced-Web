import React from "react";
import { connect } from "react-redux";
import { Button, Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CLIENT_ID, ROUTES } from "../../utils/constant";
import { GoogleLogout } from "react-google-login";
import "./DashBoard.scss";
import News from "../../module/News/News";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
const { Header, Content } = Layout;
const DashBoardContainer = ({user}) => {
	const cookies = new Cookies();
	let history = useHistory();
	const onLogoutSuccess = ( )=>{
		history.push(ROUTES.LOGIN);
		
	}
	return (
		<Router>
			<div className="dashboard-container">
				<Layout className="layout">
					<Header>
						<div className="dashboard-header">
							<Menu theme="dark" mode="horizontal">
								<Menu.Item key="News">
									<Link to="/news">News</Link>
								</Menu.Item>
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
								<Avatar src={user.image}/>
							</div>
						</div>
					</Header>
					<Content style={{ padding: "0 50px" }}>
						<div className="dashboard-content">
							<Switch>
								<Route exact path="/news">
									<News />
								</Route>
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

const mapDispatchToProps = {};

export const DashBoard = connect(
	mapStateToProps,
	mapDispatchToProps
)(DashBoardContainer);
