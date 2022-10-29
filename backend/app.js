const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", (socket) => {
    console.log("A user disconnected");
  });
});
server.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
