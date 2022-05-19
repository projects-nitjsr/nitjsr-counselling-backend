const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const {uploadPdf}=require('./helpers/pdfHandler')
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const readFile = utils.promisify(fs.readFile)
async function getTemplateHtml() {
console.log("Loading template file in memory")
try {
const invoicePath = path.resolve("./invoice.html");
return await readFile(invoicePath, 'utf8');
} catch (err) {
return Promise.reject("Could not load html template");
}
}
async function generatePdf() {
let data = {};
getTemplateHtml().then(async (res) => {
// Now we have the html code of our template in res object
// you can check by logging it on console
// console.log(res)
console.log("Compiing the template with handlebars")
const template = hb.compile(res, { strict: true });
// we have compile our code with handlebars
const result = template(data);
// We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
const html = result;
// we are using headless mode
const browser = await puppeteer.launch();
const page = await browser.newPage()
// We set the page content as the generated html by handlebars
await page.setContent(html)
// We use pdf function to generate the pdf in the same folder as this file.
const pagedf=await page.pdf({ format: 'A4' })
//uploadPdf(JSON.stringify(pagedf));
var enc = new TextDecoder("utf-8");
console.log(typeof enc.decode(pagedf));
await browser.close();
console.log("PDF Generated")
}).catch(err => {
console.error(err)
});
}
generatePdf();