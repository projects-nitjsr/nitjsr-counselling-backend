const db = require("../../../helpers/dbconnect");
const jwt = require("jsonwebtoken");
const verifyNewUser = async (req, res) => {
  try {
    const { regno } = req.body;
    if (!regno) {
      res.status(400).json({
        message: "Missing parameters",
        status: 0,
      });
    } else {
      const searchStudent = `SELECT * FROM student_credentials WHERE regno = ?`;
      const student = db.queryAsync(searchStudent, [regno]);
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
          process.env.STUDENT_SIGNUP_SECRET,
          { expiresIn: "1" }
        );

        //send email
        //url = process.env.FRONTEND_URL/reset?t=token
        res.status(200).json({
          message: `Email sent to ${email} with an url to register`,
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

module.exports = verifyNewUser;
