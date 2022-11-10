const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const DraftTemplate = require("./models/draftTemplate");
const ExceptionHandler = require("./core/ExceptionHandler");
const ValidationException = require("./exceptions/ValidationException");
const ResourceNotFoundException = require("./exceptions/ResourceNotFoundException");
const BadRequestException = require("./exceptions/BadRequestException");
const findOrCreateTemplate = require("./utils/findOrCreateTemplate");
const encryptPdf = require("./hummus");
const { generatePdf } = require("./utils/pdfGenerator");
const user = require("./routes/user");
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
      console.log("check user", user);
      socket.join(id);
      // console.log(template.data);
      socket.emit("load-document", template.data);
      socket.on("save-document", async (data) => {
        await DraftTemplate.findOneAndUpdate(
          { id },
          { data, lastUpdated: Date.now() }
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
app.get("/pdf", async (req, res) => {
  try {
    const html = await ejs.renderFile(
      path.join(__dirname, "views", "test.ejs")
    );
    const pdf = await generatePdf(html);
    fs.writeFileSync(
      path.join(__dirname, "test", "normal", "normal_data.pdf"),
      pdf
    );
    const inputFile = path.join(__dirname, "test", "normal", "normal_data.pdf");
    const outputFile = path.join(
      __dirname,
      "test",
      "encrypted",
      "encrypted_data.pdf"
    );
    const result = encryptPdf(inputFile, outputFile);
    res.set({
      "Content-Type": "application/pdf",
    });
    res.download(outputFile);
  } catch (err) {
    // console.log(err);
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});
app.get("/getData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new BadRequestException({ message: "Id is missing" });
    const template = await DraftTemplate.findOne({ id });
    if (!template)
      throw new ResourceNotFoundException({ resouceName: "Template" });
    res.json(template);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});
server.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
