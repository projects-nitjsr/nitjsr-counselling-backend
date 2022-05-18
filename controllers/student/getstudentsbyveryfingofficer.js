const db = require("../../helpers/dbconnect");

const getstudentsbyverifingcollege = async (req, res) => {
  const veryfingOfficer = req.body.email;

  try {
    const stu = await db.queryAsync(
      "SELECT * FROM student JOIN student_status ON student.regNo = student_status.regNo WHERE verifying_officer = ? ",
      [veryfingOfficer]
    );

    if (stu.length == 0) {
      throw new Error("No students found!");
    }

    res.status(200).json({ success: true, result: stu });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getstudentsbyverifingcollege;
