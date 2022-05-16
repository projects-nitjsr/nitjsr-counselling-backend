const db = require("../../helpers/dbconnect");

const deleteStudent = async (req, res) => {
  const regNo = req.params.regNo;

  try {
    await db.queryAsync("DELETE FROM student WHERE regno = ?", [regNo]);

    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = deleteStudent;
