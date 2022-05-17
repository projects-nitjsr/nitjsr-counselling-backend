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
      const searchStudent = `SELECT * FROM student_credentials WHERE email = ?`;
      const student = db.queryAsync(searchStudent, [email]);
      if (!student) {
        res.status(200).json({
          message: "Not found",
          status: 0,
        });
      } else {
        const token = jwt.sign(
          {
            email: student.email,
          },
          process.env.STUDENT_FORGOT_PASSWORD_SECRET,
          { expiresIn: "1" }
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
