const HummusRecipe = require("hummus-recipe");
const InternalServerException = require("./exceptions/InternalServerException");
const encryptPdf = (input, output) => {
  try {
    const pdfDoc = new HummusRecipe(input, output);
    pdfDoc
      .encrypt({
        userPassword: "123",
        ownerPassword: process.env.OWNER_PASSWORD || "tvs1234",
        userProtectionFlag: 4,
      })
      .endPDF();
    return pdfDoc;
  } catch (err) {
    throw new InternalServerException({ message: err.message });
  }
};
module.exports = encryptPdf;
