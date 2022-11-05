const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Template = require("./models/template");
const ExceptionHandler = require("./core/ExceptionHandler");
const ValidationException = require("./exceptions/ValidationException");
const encryptPdf = require("./hummus");
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

io.on("connection", socket => {
  console.log("Connected")
  socket.on("get-document", async id => {
    const template = await findOrCreateTemplate(id)
    socket.join(id)
    socket.emit("load-document", template.data)
    socket.on("save-document", async data => {
      await Template.findOneAndUpdate({id}, { data })
    })
  })
})

async function findOrCreateTemplate(id) {
  if (id == null) return

  const document = await Template.findOne({id})
  if (document) return document
  return await Template.create({id, data: " " })
}



app.post("/add", async (req, res) => {
  try {
    const { document } = req.body;
    if (!document) throw new ValidationException({});
    const newTemplate = new Template(req.body);
    await newTemplate.save();
    res.send(newTemplate);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});
app.post("/encrypt", (req, res) => {
  try {
    encryptPdf("./test/input.pdf", "./test/output1.pdf");
    res.send("Encrypted");
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});
server.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
