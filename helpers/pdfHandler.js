// const multer=require('multer');
// const fileUploadMiddleware=require('./fileUploadMiddleware')
// const cloudinary = require('cloudinary').v2;
// const sharp=require('sharp');
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });


//  /* Multer config for file upload*/

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// app.post('/files', upload.single('file'), fileUploadMiddleware);

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const sharp=require('sharp');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadPdf = async (data) => {
    try {
      console.log(data);
        
        const uploadResponse = await cloudinary.uploader.upload(data, function(res,err){console.log(res,err)});
        console.log(uploadResponse);
        return uploadResponse.secure_url;
        //res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        //res.status(500).json({ err: 'Something went wrong' });
    }
  };

  module.exports={uploadPdf};