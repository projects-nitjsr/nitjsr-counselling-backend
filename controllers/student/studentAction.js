module.exports = async (req, res) => {
  const regNo = req.body.regno;
  const studentAction = req.body.studentAction;
  try {
    const currentAllotedCollege = await db.queryAsync(
      "SELECT currentSeatIndex FROM student WHERE regno = ?",
      [regNo]
    );
    if (!currentAllotedCollege[0].currentSeatIndex) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot perform this action" });
    }
    await db.queryAsync(
      "UPDATE student SET studentAction = ? WHERE regno = ?; ",
      [studentAction, regNo]
    );
    res
      .status(200)
      .json({ success: true, message: "Student Action Updated Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
