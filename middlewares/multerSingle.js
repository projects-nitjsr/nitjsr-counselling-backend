const multer = require("multer");

module.exports = (req, res, next) => {
  const upload = multer().single("fileData");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    next();
  });
};
