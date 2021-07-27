import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (loggedIn) {
					return <Component {...props} />;
				} else {
					return <Redirect to="/login" />;
				}
			}}
		></Route>
	);
};

export default PrivateRoute;
