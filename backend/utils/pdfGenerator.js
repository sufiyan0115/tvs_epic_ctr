const puppeteer = require("puppeteer");
const path = require("path");
const generatePdf = async (html) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.addStyleTag({
    path: path.join(__dirname, "..", "PreviewTemplatePage.css"),
  });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });
  await browser.close();
  return pdf;
};

module.exports = {
  generatePdf,
};
