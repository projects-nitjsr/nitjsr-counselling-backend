const db = require("../../../helpers/dbconnect");

const logout = async (req, res) => {
  try {
    const regno = req.body.regno;
    const token = req.body.token;
    if(!token){
      res.status(401).json({
        message: "Already logged out",
        status: 0,
      });
    }
    else{
      let accessToken = null;
      let sql = `UPDATE student_credentials SET token = ? where regno = ?`;
      await db.queryAsync(sql, [accessToken, regno]);
      res.status(200).json({
        status: 1,
        message:"Logged out successfully"
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error " + err,
      status: 0,
    });
  }
};

module.exports = logout;

