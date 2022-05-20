const db = require("../../helpers/dbconnect");
const imageUploader = require("../../helpers/imageHandler");

module.exports = async (req, res) => {
  const regno = req.body.regno;
  const image = req.file;

  try {
    if (!image) throw new Error("Nothing to update!!");
    if (image) {
      const student = await db.queryAsync(
        "SELECT profile_image_url FROM student WHERE regno = ?",
        [regno]
      );

      await imageUploader.deleteImage(student[0].profile_image_url);

      const newImageUrl = await imageUploader.uploadImage(image);

      await db.queryAsync(
        "UPDATE student SET profile_image_url = ? WHERE regno = ?",
        [newImageUrl, regno]
      );
    }

    res.status(200).json({
      success: true,
      message: "Image of Student Updated!! ",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
