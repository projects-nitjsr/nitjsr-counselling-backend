const db = require("../../helpers/dbconnect");

const verifyStudent = async (req, res) => {
  const regNo = req.body.regno;
  const verifyingOfficer = req.body.email;

  try {
    const studentStatus = await db.queryAsync(
      "SELECT verifying_officer,regno FROM student_status WHERE regno = ?",
      [regNo]
    );

    if (studentStatus.length == 0) throw new Error("student do not exist");

    if (studentStatus[0].verifying_officer !== verifyingOfficer) {
      return res.status(401).json({ success: false, message: "not eligible" });
    }

    await db.queryAsync(
      "UPDATE student_status SET acceptedBy = ?,rejectedBy = NULL,failureDesc= NULL,confirmationPending = ? WHERE regno = ? ",
      [verifyingOfficer, true, regNo]
    );

    res.status(200).json({ success: true, message: "verified succesfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = verifyStudent;
