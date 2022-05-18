const db = require("../../helpers/dbconnect");

module.exports = async (req, res) => {
  try {
    const centerInchargeList = await db.queryAsync(
      "SELECT * FROM admin WHERE designation = ?",
      ["ci"]
    );
    if (centerInchargeList.length == 0) {
      throw new Error("No Center Incharges Found");
    }
    res.status(200).json({ success: true, data: centerInchargeList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
