import StudentDashboard from "@components/Student/StudentDashboard";
import TeacherDashboard from "@components/Teacher/TeacherDashboard";
import Login from "@components/Login";
import Signup from "@components/Signup";
import UserProvider from "@contexts/User/UserProvider";
import Create from "@pages/Create";
import Jitsi from "@pages/Jitsi";
import Landing from "@pages/Landing";
import NotFound from "@pages/NotFound";
import React from "react";

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import PrivateRoute from "@components/Private";
import Meet from "./Meet";

const App = () => {
	return (
		<UserProvider>
			<Router>
				<Switch>
					<Route
						path="/"
						exact
						component={Landing}
					/>
					<PrivateRoute
						component={StudentDashboard}
						path="/student"
					/>
					<PrivateRoute
						component={TeacherDashboard}
						path="/teacher"
					/>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route
						path="/create"
						exact
						component={Create}
					/>
					<Route
						path="/jitsi"
						exact
						component={Jitsi}
					/>
					<Route 
						path="/meet"
						exact
						component={Meet}
					/>
				</Switch>
			</Router>
		</UserProvider>
	)
}

export default App
