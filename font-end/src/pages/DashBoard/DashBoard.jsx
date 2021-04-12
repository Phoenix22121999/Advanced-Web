import React from "react";
import { connect } from "react-redux";
import { Button, Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CLIENT_ID } from "../../utils/constant";
import { GoogleLogout } from "react-google-login";
import "./DashBoard.scss";
import News from "../../module/News/News";
const { Header, Content, Footer } = Layout;
const DashBoardContainer = (props) => {
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
							<GoogleLogout
								clientId={CLIENT_ID}
								buttonText="Logout"
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export const DashBoard = connect(
	mapStateToProps,
	mapDispatchToProps
)(DashBoardContainer);
