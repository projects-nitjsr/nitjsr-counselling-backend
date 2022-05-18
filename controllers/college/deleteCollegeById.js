const db = require("../../helpers/dbconnect");

const deleteCollegeById = async (req, res) => {
    const clgId = req.params.id;

  try {
    await db.queryAsync("DELETE FROM colleges WHERE id = ?", [clgId]);

    res
      .status(200)
      .json({ success: true, message: "College deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = deleteCollegeById;
