import "./App.css";
import { DashBoard, Login } from "./pages";
import { ROUTES } from "./utils/constant";
import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function App() {
	// let history = useHistory();
	useEffect(() => {
		// if(isSignedIn){
		// 	history.push(ROUTES.DASHBOARD)
		// }
	}, [])

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

export default App;
