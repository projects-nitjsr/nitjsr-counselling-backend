const db = require("../../../helpers/dbconnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//adminlogin controller
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({
        message: "Missing parameter",
        status: 0,
      });
    } else {
      let sql = `SELECT * FROM admin WHERE email = ?`;
      const [admin] = await db.queryAsync(sql, [email]);
      console.log(admin);
      if (!admin) {
        res.status(200).json({
          message: "Bad Credentials",
          status: 0,
        });
      } else {
        let check = await bcrypt.compare(password.trim(), admin.password);
        console.log(admin);
        if (check) {
          let accessToken = jwt.sign(
            {
              email: admin.email,
              designation: admin.designation,
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
