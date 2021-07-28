import React, { useEffect, useState } from "react";

const UsersContext = React.createContext();
const url = "http://localhost:8000/api/v1";

const UsersProvider = ({ children }) => {
	const [room, setRoom] = useState(
		JSON.parse(localStorage.getItem("current-room")) || ""
	);
	const [user, setUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(
		JSON.parse(localStorage.getItem("auth")) ? true : false
	);
	const [error, setError] = useState("");

	const register = async (userInfo) => {
		const res = await fetch(`${url}/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userInfo),
		});

		const data = await res.json();

		if (data.success) {
			login({ email: userInfo.email, password: userInfo.password });
		} else {
			setError(data.errMsg);
		}
	};

	const login = async (userInfo) => {
		const res = await fetch(`${url}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userInfo),
		});

		const data = await res.json();
		const { success, id, username, token } = data;

		// Set JWT Token
		if (success) {
			localStorage.setItem(
				"auth",
				JSON.stringify({
					id,
					authToken: token.split(" ")[1],
				})
			);
			setUser({ id, username });
			setLoggedIn(true);
		} else {
			setError(data.errMsg);
		}
	};

	const logout = () => {
		setUser({});
		setLoggedIn(false);

		localStorage.removeItem("auth");
		localStorage.removeItem("current-room");

		window.location.reload();
	};

	const getCurrentUser = async (id, token) => {
		const res = await fetch(`${url}/user/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		if (data.success) {
			setUser(data.user);
			setLoggedIn(true);
		} else {
			setError(data.errMsg);
		}
	};

	useEffect(() => {
		const auth = JSON.parse(localStorage.getItem("auth"));
		if (auth) getCurrentUser(auth.id, auth.authToken);
	}, []);

	return (
		<UsersContext.Provider
			value={{
				user,
				loggedIn,
				error,
				setError,
				register,
				login,
				logout,
				room,
				setRoom,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};

export { UsersContext, UsersProvider };
