const db = require("../../../helpers/dbconnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//adminlogin controller
const adminLogin = async (req, res) => {
  try {
    const { email, password, designation } = req.body;
    if (!email || !password || !designation) {
      res.status(401).json({
        message: "Missing parameter",
        status: 0,
      });
    } else {
      let sql = `SELECT * from admin_credentials where email = ?`;
      const [admin] = await db.queryAsync(sql, [email, role]);
      if (!admin) {
        res.status(200).json({
          message: "Bad Credentials",
          status: 0,
        });
      } else {
        let check = await bcrypt.compare(password.trim(), admin.password);
        if (check) {
          let accessToken = jwt.sign(
            {
              email: admin.email,
              designation: designation,
            },
            process.env.ADMIN_SECRET
          );
          let sql = `UPDATE admin_credentials SET token = ? where email = ?`;
          await db.queryAsync(sql, [accessToken, email]);
          res.status(200).json({
            status: 1,
            token: accessToken,
            email: email,
            designation: designation,
          });
        } else {
          res.status(401).json({
            message: "Bad Credentials",
            status: 0,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error ",
      status: 0,
    });
  }
};

module.exports = adminLogin;
