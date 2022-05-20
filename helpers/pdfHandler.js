require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadPdf = async (data) => {
  try {
    if (
      data.mimetype !== "application/pdf" &&
      data.mimetype !== "application/x-pdf"
    ) {
      throw new Error("unsupported file format");
    }
    if (data.size > 3155728) {
      throw new Error("file size must be <= 3MB");
    }
    //buffer to base 64
    const base64Data =
      "data:application/pdf;base64," + data.buffer.toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(base64Data, {
      folder: `${process.env.CLOUDINARY_FOLDER}`,
    });

    return uploadResponse.secure_url;
  } catch (err) {
    console.error(err);
  }
};

const deletePdf = (pdfUrl) => {
  try {
    let fileName = pdfUrl.split(`/${process.env.CLOUDINARY_FOLDER}/`)[1];
    let publicId = `${process.env.CLOUDINARY_FOLDER}/` + fileName.split(".")[0];
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`${publicId}`, result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadPdf, deletePdf };
