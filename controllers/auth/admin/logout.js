const db = require("../../../helpers/dbconnect");

const logout = async (req, res) => {
  try {
    const { email } = req.user;
    let sql = `UPDATE admin_credentials SET token = NULL where email = ?`;
    await db.queryAsync(sql, [email]);
    res.status(200).json({
      status: 1,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error " + err,
      status: 0,
    });
  }
};

module.exports = logout;
