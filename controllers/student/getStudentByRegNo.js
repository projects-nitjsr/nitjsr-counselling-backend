const db = require("../../helpers/dbconnect");

const getStudentByRegNo = async (req, res) => {
  const regNo = req.params.regNo;

  try {
    const results = await db.queryAsync(
      "SELECT * FROM student WHERE regNo = ?",
      [regNo]
    );

    if (results.length == 0) {
      throw new Error("Student not found");
    }

    res.status(200).json({ success: true, result: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = getStudentByRegNo;
