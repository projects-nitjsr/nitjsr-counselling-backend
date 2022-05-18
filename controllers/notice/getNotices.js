const db = require("../../helpers/dbconnect");
module.exports = async (req, res) => {
  const noOfNotices = parseInt(req.query.n) || 5;

  try {
    if (noOfNotices > 200) {
      return res.status(400).json({
        Success: false,
        message: "number of Notices exceeded the limit",
      });
    }
    const notices = await db.queryAsync(
      `SELECT * FROM (SELECT * FROM notices ORDER BY id DESC LIMIT ? )Var1 ORDER BY id ASC;`,
      [noOfNotices]
    );

    if (notices.length == 0) {
      throw new Error("No notices found!");
    }

    res.status(200).json({ success: true, result: notices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
