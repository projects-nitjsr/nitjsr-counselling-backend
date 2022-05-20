const db = require("../../helpers/dbconnect");

const updateStudentVerifyingCollege = async (req, res) => {
  const { verifyingCollegeWithRegNo } = req.body;
  const verifyingArray = [];

  for (let i = 0; i < verifyingCollegeWithRegNo.length; ++i) {
    verifyingArray.push([
      verifyingCollegeWithRegNo[i].collegeId,
      verifyingCollegeWithRegNo[i].regNo,
    ]);
  }

  try {
    await db.queryAsync(
      "UPDATE student_status SET verifying_college = ? WHERE regNo = ?",
      verifyingArray
    );

    res.status(200).json({ success: true, message: "Update successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = updateStudentVerifyingCollege;
