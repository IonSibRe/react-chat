import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { UsersContext } from "../context/UsersContext";
import "../styles/Chat.scss";

const Chat = () => {
	const [message, setMessage] = useState("");
	const { user, room } = useContext(UsersContext);

	const [users, setUsers] = useState([]);

	const [responseMessages, setResponseMessages] = useState([]);
	const socketRef = useRef(null);
	const sendMsgInputRef = useRef(null);

	const sendMessage = (e) => {
		e.preventDefault();

		// Emit message to server
		socketRef.current.emit("chatMessage", message);

		sendMsgInputRef.current.value = "";
		sendMsgInputRef.current.focus();
	};

	const leaveRoom = () => socketRef.current.disconnect();

	useEffect(() => {
		socketRef.current = io.connect("http://localhost:8000");

		const tempUser = { username: user.username, room };

		// Join Room
		socketRef.current.emit("joinRoom", tempUser);

		// Get Room and users
		socketRef.current.on("roomUsers", ({ users }) => {
			setUsers(users);
		});

		socketRef.current.on("message", (msg) => {
			setResponseMessages((responseMessages) => [
				...responseMessages,
				msg,
			]);
		});
	}, [user, room]);

	return (
		<section className="sectionCenter flexCenter">
			<div className="chatCard">
				<div className="chatCardHeaderWrap">
					<h2 className="chatCardHeaderTitle">Next Chat</h2>
					<h3 className="chatCardHeaderRoom">{room}</h3>
					<Link
						to="/"
						className="chatCardHeaderLink"
						onClick={leaveRoom}
					>
						Leave Room
					</Link>
				</div>

				<div className="chatCardMainWrap">
					<div className="chatCardInfoWrap">
						<div className="chatCardInfoInnerWrap">
							<h4 className="chatCardInfoUsers">Online Users:</h4>
							<ul className="chatCardInfoList">
								{users
									? users.map((user) => {
											return (
												<li
													className="chatCardInfoItem"
													key={user.id}
												>
													<i className="fas fa-user chatCardInfoUserIcon"></i>{" "}
													{user.username}
												</li>
											);
									  })
									: ""}
							</ul>
						</div>
					</div>
					<div className="chatCardMessageWrap">
						<ul className="chatCardMessageList">
							{responseMessages
								? responseMessages.map((resMsg) => {
										return (
											<li
												className="chatCardMessageItem"
												key={Math.random() * 100000}
											>
												<div
													className="
										chatCardMessageItemHeaderWrap
									"
												>
													<p
														className="
											chatCardMessageItemHeaderUsername
										"
													>
														{resMsg.username}
													</p>
													<p
														className="
											chatCardMessageItemHeaderTime
										"
													>
														{resMsg.time}
													</p>
												</div>
												<p className="chatCardMessageItemText">
													{resMsg.text}
												</p>
											</li>
										);
								  })
								: ""}
						</ul>
					</div>
				</div>

				<div className="chatCardInputWrap">
					<form
						className="chatCardInputForm"
						onSubmit={(e) => sendMessage(e)}
					>
						<input
							type="text"
							className="chatCardInput"
							ref={sendMsgInputRef}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button type="submit" className="chatCardSubmitBtn">
							Send
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Chat;
