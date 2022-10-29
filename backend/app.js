const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Template = require("./Models/template");
const app = express();
const PORT = process.env.PORT || 3000;
const server = require("http").createServer(app);
const db_URL = process.env.db_URL || "mongodb://localhost:27017/tvs-ctr";

mongoose
  .connect(db_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("We are Connected to Database");
  })
  .catch((err) => {
    console.log("Database Error!!");
    console.log(err);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", (socket) => {
    console.log("A user disconnected");
  });
});
app.post("/add", async (req, res) => {
  try {
    const newTemplate = new Template(req.body);
    await newTemplate.save();
    res.send(newTemplate);
  } catch (e) {
    res.status(500).send(e);
  }
});
server.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
