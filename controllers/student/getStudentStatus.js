const db = require("../../helpers/dbconnect");

const getSudentStatus = async (req, res) => {
  const regNo = req.params.regNo;

  try {
    const studentStatus = await db.queryAsync(
      "SELECT * FROM student_status WHERE regno = ?",
      [regNo]
    );

    if (studentStatus.length == 0) {
      throw new Error("No such student found");
    }

    res.status(200).json({ success: true, result: studentStatus });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getSudentStatus;
