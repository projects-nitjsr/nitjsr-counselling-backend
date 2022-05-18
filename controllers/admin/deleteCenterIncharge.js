const db = require("../../helpers/dbconnect");

module.exports = async (req, res) => {
  const centerInchargeEmail = req.body.email;

  try {
    const centerInchargeExist = await db.queryAsync(
      "SELECT EXISTS(SELECT 1 FROM admin WHERE email = ? )",
      [centerInchargeEmail]
    );
    if (centerInchargeExist > 0) {
      await db.queryAsync("DELETE FROM admin WHERE email = ? ", [
        centerInchargeEmail,
      ]);
      res
        .status(200)
        .json({ success: true, message: "Center Incharge Deleted" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Center Incharge doesnot exist" });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};
