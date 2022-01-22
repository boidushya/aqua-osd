import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../contexts/User/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { token } = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				token ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;