import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { UsersContext } from "./context/UsersContext";

function App() {
	const { loggedIn } = useContext(UsersContext);
	return (
		<Router>
			<Navbar />
			<Switch>
				<PrivateRoute
					component={Home}
					loggedIn={loggedIn}
					exact
					path="/"
				/>
				<Route path="/chat">
					<Chat />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
