const db = require("../../helpers/dbconnect");

module.exports = async (req, res) => {
  const notice = req.body.notice;
  const user = req.user.email;
  try {
    if (notice.length < 10) {
      return res.status(400).json({
        Success: false,
        message: "notice too short",
      });
    }
    await db.queryAsync(
      "INSERT INTO notices(notice,user,timestamp) VALUES(?,?,current_timestamp())",
      [notice, user]
    );

    res
      .status(200)
      .json({ success: true, message: "notice created sucessfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
