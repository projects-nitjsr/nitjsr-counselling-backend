const db = require("../../helpers/dbconnect");

const rejectStudent = async (req, res) => {
  const regNo = req.body.regNo || "CCQ59RJX1003";
  const verifyingOfficer = req.body.email || "nkhfcacarr@nitbho.in";
  const failureMessage = req.body.message || "sahi kar lo tojsdqhwdbhwqbdkjqwdqhwbhqw";

  try {
    if (failureMessage.length < 20)
      throw new Error("failure Message too short");
    const studentStatus = await db.queryAsync(
      "SELECT verifying_officer,regno FROM student_status WHERE regno = ?",
      [regNo]
    );

    if (studentStatus.length == 0) throw new Error("student do not exist");

    if (studentStatus[0].verifying_officer !== verifyingOfficer) {
      return res.status(401).json({ success: false, message: "not eligible" });
    }

    await db.queryAsync(
      "UPDATE student_status SET applicationStatus='pending', acceptedBy= NULL , rejectedBy = ?,confirmationPending = ?,failureDesc = ? WHERE regno = ? ",
      [verifyingOfficer, true, failureMessage, regNo]
    );

    res.status(200).json({ success: true, message: "rejected succesfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = rejectStudent;
