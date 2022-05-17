require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadPdf = async (data) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(
      data,
      function (res, err) {
        console.log(res, err);
      }
    );
    console.log(uploadResponse);
    return uploadResponse.secure_url;
  } catch (err) {
    console.error(err);
  }
};
const deletePdf = (imageUrl) => {
  try {
    let fileName = imageUrl.split(`/${process.env.CLOUDINARY_NAME}/`)[1];
    let publicId =
      `${process.env.CLOUDINARY_NAME}/` +
      fileName.substr(0, fileName.length - 4);
    cloudinary.uploader.destroy(publicId, function (error, result) {
      if (result) {
        console.log("deleted");
      }
      error && console.log(error);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadPdf, deletePdf };
