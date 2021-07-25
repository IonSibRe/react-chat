const express = require("express");
const http = require("http");
const registerSockets = require("./sockets");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => registerSockets(io, socket));

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
