const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Template = require("./models/template");
const ExceptionHandler = require("./core/ExceptionHandler");
const ValidationException = require("./exceptions/ValidationException");
const ResourceNotFoundException = require("./exceptions/ResourceNotFoundException");
const BadRequestException = require("./exceptions/BadRequestException");
const findOrCreateTemplate = require("./utils/findOrCreateTemplate");
const user = require("./routes/user");
const pdfGenerate = require("./routes/pdfGenerate");
const template = require("./routes/template");
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
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error!!");
    console.log(err);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("get-document", async (data) => {
    try {
      const { id, user } = data;
      const template = await findOrCreateTemplate(id, user);
      socket.join(id);
      socket.emit("load-document", {
        name: template.name,
        data: template.data,
      });
      socket.on("save-document", async (res) => {
        const { name, data } = res;
        await Template.findOneAndUpdate(
          { id },
          { name, data, lastUpdated: Date.now() }
        );
      });
    } catch (err) {
      const e = ExceptionHandler(err);
      console.log(e);
      socket.emit("error", e);
    }
  });
});

app.use("/", user);
app.use("/pdf", pdfGenerate);
app.use("/template", template);

server.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
