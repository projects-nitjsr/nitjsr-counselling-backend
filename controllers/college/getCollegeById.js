const db = require("../../helpers/dbconnect");

const getCollegeById = async (req, res) => {
  const collegeId = req.params.id;

  try {
    const results = await db.queryAsync("SELECT * FROM colleges WHERE id = ?", [
      collegeId,
    ]);

    if (results.length == 0) {
      throw new Error("College not found");
    }

    res.status(200).json({ success: true, result: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = getCollegeById;
