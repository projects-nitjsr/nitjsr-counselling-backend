const db = require("../../helpers/dbconnect");
const imageUploader = require("../../helpers/imageHandler");

module.exports = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const image = req.file;

  try {
    if (!name && !image) throw new Error("Nothing to update!!");
    if (name) {
      await db.queryAsync(
        "UPDATE verifying_officers SET name = ? WHERE email = ?",
        [name, email]
      );
    }

    if (image) {
      const verifyingOfficer = await db.queryAsync(
        "SELECT profile_image_url FROM admin WHERE email = ?",
        [email]
      );

      await imageUploader.deleteImage(verifyingOfficer[0].profile_image_url);

      const newImageUrl = await imageUploader.uploadImage(image);

      await db.queryAsync(
        "UPDATE admin SET profile_image_url = ? WHERE email = ?",
        [newImageUrl, email]
      );
    }

    res.status(200).json({
      success: true,
      message: "Details for Verifying Officer Updated!! ",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
