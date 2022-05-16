require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const sharp=require('sharp');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImage = async (data) => {
    try {
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
        const uploadResponse = await cloudinary.uploader.upload(data, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        return uploadResponse.secure_url;
        //res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        //res.status(500).json({ err: 'Something went wrong' });
    }
  };

  const deleteImage =async(imageUrl) =>  {
    try{
      let fileName = imageUrl.split(`/${process.env.CLOUDINARY_NAME}/`)[1];
      let publicId = `${process.env.CLOUDINARY_NAME}/` + fileName.substr(0, fileName.length - 4);
      await cloudinary.uploader.destroy(publicId, function (error, result) {
        error && console.log(error);
      });}
      catch (err) {
        console.error(err);}
    };

  module.exports={uploadImage,deleteImage};