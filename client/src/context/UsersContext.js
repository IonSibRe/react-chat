import React, { useState } from "react";

const UsersContext = React.createContext();
const url = "http://localhost:8000/api/v1";

const UsersProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState("");
	const [currentRoom, setCurrentRoom] = useState("");
	const [user, setUser] = useState();

	const register = async (userInfo) => {
		const res = await fetch(`${url}/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userInfo),
		});

		const data = await res.json();
		setUser(data);
	};

	const login = async (userInfo) => {
		console.log(userInfo);

		const res = await fetch(`${url}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userInfo),
		});

		const data = await res.json();
		setUser(data);
	};

	return (
		<UsersContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				currentRoom,
				setCurrentRoom,
				register,
				login,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};

export { UsersContext, UsersProvider };
