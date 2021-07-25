const formatMessage = require("./utils/messages");
const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} = require("./utils/users");

const botName = "React Chat Bot";

module.exports = (io, socket) => {
	socket.on("joinRoom", ({ username, room }) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);

		// Welcome current user
		socket.emit("message", formatMessage(botName, "Welcome to React Chat"));

		// Connect
		socket.broadcast
			.to(user.room)
			.emit(
				"message",
				formatMessage(botName, `${user.username} has joined the chat`)
			);

		// Send Users and Room Info
		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});

	// Listen for chatMessage
	socket.on("chatMessage", (msg) => {
		const user = getCurrentUser(socket.id);

		io.to(user.room).emit("message", formatMessage(user.username, msg));
	});

	// Disconnect
	socket.on("disconnect", () => {
		const user = userLeave(socket.id);
		if (user) {
			io.to(user.room).emit(
				"message",
				formatMessage(botName, `${user.username} has left the chat`)
			);

			io.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
	});
};
