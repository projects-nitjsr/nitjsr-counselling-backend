const puppeteer = require("puppeteer");
const hb = require("handlebars");
const certificateTemplete = require("./pdfTemplete");

const { uploadPdf } = require("../pdfHandler");

module.exports = async () => {
  let data = {};
  const pdf = {};

  const template = hb.compile(certificateTemplete, { strict: true });
  const html = template(data);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  pdf.buffer = await page.pdf({ format: "A4" });
  await browser.close();
  pdf.mimetype = "application/pdf";

  const pdfUrl = await uploadPdf(pdf);
  return pdfUrl;
};
