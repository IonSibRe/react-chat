import React, { useState } from "react";

const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState("");
	const [currentRoom, setCurrentRoom] = useState("");

	return (
		<UsersContext.Provider
			value={{ currentUser, setCurrentUser, currentRoom, setCurrentRoom }}
		>
			{children}
		</UsersContext.Provider>
	);
};

export { UsersContext, UsersProvider };
