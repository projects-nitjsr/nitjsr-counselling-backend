const db = require("../../helpers/dbconnect");

const getStudentResultByRegNo = async (req, res) => {
  const studentRegNo = req.params.regNo;

  try {
    const results = await db.queryAsync(
      "SELECT * FROM result WHERE regno = ?",
      [studentRegNo]
    );

    if (results.length == 0) {
      throw new Error("Student's result not found");
    }

    res.status(200).json({ success: true, result: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getStudentResultByRegNo;
