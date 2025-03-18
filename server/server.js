import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("notification", (data) => {
    console.log("Received notification:", data);
    io.emit("notification", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Add a GET route to check the socket status
app.get("/status", (req, res) => {
  if (io.engine.clientsCount > 0) {
    res.json({ message: "Socket is working", clients: io.engine.clientsCount });
  } else {
    res.status(503).json({ message: "No active connections" });
  }
});

server.listen(4000, () => {
  console.log("Socket.IO server running on port 4000");
});
