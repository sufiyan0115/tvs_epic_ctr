const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const auth = require("../utils/auth");
const { generatePdf } = require("../utils/pdfGenerator");
const encryptPdf = require("../hummus");
const ExceptionHandler = require("../core/ExceptionHandler");

router.post("/", async (req, res) => {
  try {
    const { html } = req.body;
    const pdf = await generatePdf(html);
    fs.writeFileSync(
      path.join(__dirname, "..", "test", "normal", "normal_data.pdf"),
      pdf
    );
    const inputFile = path.join(
      __dirname,
      "..",
      "test",
      "normal",
      "normal_data.pdf"
    );
    const outputFile = path.join(
      __dirname,
      "..",
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
module.exports = router;
