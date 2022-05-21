const db = require("../../../helpers/dbconnect");
const jwt = require("jsonwebtoken");
const forgotPassword = async (req, res) => {
  try {
    const { regno } = req.body;
    if (!regno) {
      res.status(400).json({
        message: "Missing parameters",
        status: 0,
      });
    } else {
      const searchStudent = `SELECT * FROM student WHERE regno = ?`;
      const student = await db.queryAsync(searchStudent, [regno]);
      if (student.length == 0) {
        res.status(200).json({
          message: "Student not found",
          status: 0,
        });
      } else {
        const token = jwt.sign(
          {
            regno: student[0].regno,
          },
          process.env.STUDENT_FORGOT_PASSWORD_SECRET,
          { expiresIn: "1h" }
        );

        //send email
        //url = process.env.FRONTEND_URL/reset?t=token
        res.status(200).json({
          message: `Email sent to ${student[0].email} with an url to reset password`,
          status: 1,
          token: token,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error " + err.message,
      status: 0,
    });
  }
};

module.exports = forgotPassword;
