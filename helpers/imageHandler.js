require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImage = async (data) => {
  if (
    data.mimetype !== "image/jpeg" &&
    data.mimetype !== "image/png" &&
    data.mimetype !== "image/jpg"
  ) {
    throw new Error("unsupported image format");
  }
  if (data.size > 3155728) {
    throw new Error("file size must be <= 3MB");
  }
  //convert to jpg if png
  if (data.mimetype === "image/png") {
    data.buffer = await sharp(data.buffer)
      .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .jpeg()
      .toBuffer();
  }
  //buffer to base 64
  const base64Data = "data:image/jpeg;base64," + data.buffer.toString("base64");
  await cloudinary.uploader.upload(base64Data, {
    folder: `${process.env.CLOUDINARY_FOLDER}`,
  });

  return uploadResponse.secure_url;
};

const deleteImage = async (imageUrl) => {
  try {
    let fileName = imageUrl.split(`/${process.env.CLOUDINARY_FOLDER}/`)[1];
    let publicId = `${process.env.CLOUDINARY_FOLDER}/` + fileName.split(".")[0];
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`${publicId}`, result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadImage, deleteImage };
