const db = require("../../helpers/dbconnect");
const imageUploader = require("../../helpers/imageHandler");
const deleteCollegeById = async (req, res) => {
    const clgId = req.params.id;

  try {
    const college = await db.queryAsync(
      "SELECT * FROM colleges WHERE id = ?",
      [clgId]
    );
    await db.queryAsync("DELETE FROM colleges WHERE id = ?", [clgId]);
    await imageUploader.deleteImage(college[0].profile_image_url);
    res
      .status(200)
      .json({ success: true, message: "College deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = deleteCollegeById;
