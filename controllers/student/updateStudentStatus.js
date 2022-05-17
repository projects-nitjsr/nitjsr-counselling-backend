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

    if (studentStatus[0].applicationStatus !== "rejected") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    if (req.body.applicationStatus) {
      console.log(req.body.applicationStatus);
      await db.queryAsync(
        "UPDATE student_status SET applicationStatus = ? WHERE regno = ?",
        [req.body.applicationStatus, regNo]
      );
    }

    if (req.body.failureDesc) {
      await db.queryAsync(
        "UPDATE student_status SET failureDesc = ? WHERE regno = ?",
        [req.body.failureDesc, regNo]
      );
    }

    if (req.body.acceptedBy) {
      await db.queryAsync(
        "UPDATE student_status SET acceptedBy = ? WHERE regno = ?",
        [req.body.acceptedBy, regNo]
      );
    }

    if (req.body.rejectedBy) {
      await db.queryAsync(
        "UPDATE student_status SET rejectedBy = ? WHERE regno = ?",
        [req.body.rejectedBy, regNo]
      );
    }

    if (req.body.confirmationStatus) {
      await db.queryAsync(
        "UPDATE student_status SET confirmationStatus = ? WHERE regno = ?",
        [req.body.confirmationStatus, regNo]
      );
    }

    if (req.body.confirmationPending) {
      await db.queryAsync(
        "UPDATE student_status SET confirmationPending = ? WHERE regno = ?",
        [req.body.confirmationPending, regNo]
      );
    }

    if (req.body.verifyingOfficer) {
      await db.queryAsync(
        "UPDATE student_status SET verifying_officer = ? WHERE regno = ?",
        [req.body.verifyingOfficer, regNo]
      );
    }

    if (req.body.verifyingCollege) {
      await db.queryAsync(
        "UPDATE student_status SET verifying_college = ? WHERE regno = ?",
        [req.body.verifyingCollege, regNo]
      );
    }

    res.status(200).json({ success: true, message: "Update successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = updateStudentStatus;
