const db = require("../../helpers/dbconnect");

const updateStudentStatus = async (req, res) => {
  const regNo = req.params.regNo;

  try {
    const studentStatus = await db.queryAsync(
      "SELECT * FROM student_status WHERE regno = ?",
      [regNo]
    );

    if (studentStatus.length == 0) {
      throw new Error("No such student found!");
    }

    if (req.params.applicationStatus) {
      await db.queryAsync(
        "UPDATE student_status SET applicationStatus = ? WHERE regno = ?",
        [req.params.applicationStatus, regNo]
      );
    }

    if (req.params.failureDesc) {
      await db.queryAsync(
        "UPDATE student_status SET failureDesc = ? WHERE regno = ?",
        [req.params.failureDesc, regNo]
      );
    }

    if (req.params.acceptedBy) {
      await db.queryAsync(
        "UPDATE student_status SET acceptedBy = ? WHERE regno = ?",
        [req.params.acceptedBy, regNo]
      );
    }

    if (req.params.rejectedBy) {
      await db.queryAsync(
        "UPDATE student_status SET rejectedBy = ? WHERE regno = ?",
        [req.params.rejectedBy, regNo]
      );
    }

    if (req.params.confirmationStatus) {
      await db.queryAsync(
        "UPDATE student_status SET confirmationStatus = ? WHERE regno = ?",
        [req.params.confirmationStatus, regNo]
      );
    }

    res.status(200).json({ success: true, message: "Update successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = updateStudentStatus;
