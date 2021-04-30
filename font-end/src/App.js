import "./App.css";
import { DashBoard, Login } from "./pages";
import "react-multi-carousel/lib/styles.css";
import { ROUTES } from "./utils/constant";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { checkLogin } from "./utils/function.utils";

function App() {
	let history = useHistory();
	useEffect(() => {
		if(checkLogin()){
			history.push(ROUTES.DASHBOARD)
		}else{
			history.push(ROUTES.LOGIN)
		}
	}, [history])

	return (
		<div className="App">
			<Switch>
				<Route exact path={ROUTES.LOGIN} component={Login} />
				<Route exact path={ROUTES.DASHBOARD} component={DashBoard} />
				<Redirect path="/" to={ROUTES.LOGIN} />
				{/* <Route component={NotFound} /> */}
			</Switch>
		</div>
	);
}

export default  App;
