const db = require("../../helpers/dbconnect");

module.exports = async (req, res) => {
  const centerInchargeEmail = req.body.email;

  try {
    await db.queryAsync("DELETE FROM admin WHERE email = ? ", [
      centerInchargeEmail,
    ]);
    res.status(200).json({ success: true, message: "Center Incharge Deleted" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};
