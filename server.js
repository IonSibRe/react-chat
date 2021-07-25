const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const registerSockets = require("./sockets");
const authRoutes = require("./routes/users");

const app = express();
const server = http.createServer(app);
dotenv.config();

// Connect to DB
mongoose.connect(
	process.env.MONGO_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("Connected to DB")
);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", authRoutes);

// Socket.io
const io = require("socket.io")(server, { cors: { origin: "*" } });
io.on("connection", (socket) => registerSockets(io, socket));

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
