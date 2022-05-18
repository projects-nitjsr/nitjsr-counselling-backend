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

    const {
      applicationStatus,
      failureDesc,
      acceptedBy,
      rejectedBy,
      confirmationPending,
      verifyingOfficer,
      verifyingCollege,
    } = req.body;

    const sqlQuery =
      "UPDATE student_status SET applicationStatus = ?, failureDesc = ?, acceptedBy = ?, rejectedBy = ?, confirmationPending = ?,verifying_officer = ?, verifying_college = ? WHERE regNo = ?";

    await db.queryAsync(sqlQuery, [
      applicationStatus || studentStatus[0].applicationStatus,
      failureDesc || studentStatus[0].failureDesc,
      acceptedBy || studentStatus[0].acceptedBy,
      rejectedBy || studentStatus[0].rejectedBy,
      confirmationPending || studentStatus[0].confirmationPending,
      verifyingOfficer || studentStatus[0].verifying_officer,
      verifyingCollege || studentStatus[0].verifying_college,
      regNo,
    ]);

    res.status(200).json({ success: true, message: "Update successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = updateStudentStatus;
