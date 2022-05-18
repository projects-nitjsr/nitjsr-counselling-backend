const db = require("../../../helpers/dbconnect");
const jwt = require("jsonwebtoken");
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        message: "Missing parameters",
        status: 0,
      });
    } else {
      const searchAdmin = `SELECT * FROM admin_credentials WHERE email = ?`;
      const admin = db.queryAsync(searchAdmin, [email]);
      if (!admin) {
        res.status(200).json({
          message: "Not found",
          status: 0,
        });
      } else {
        const token = jwt.sign(
          {
            email: admin.email,
          },
          process.env.ADMIN_FORGOT_PASSWORD_SECRET,
          { expiresIn: "1h" }
        );

        //send email
        //url = process.env.FRONTEND_URL/reset?t=token
        res.status(200).json({
          message: `Email sent to ${email} with an url to reset password`,
          status: 1,
          token: token,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error" + err.message,
      status: 0,
    });
  }
};

module.exports = forgotPassword;
