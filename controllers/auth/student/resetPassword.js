const db = require("../../../helpers/dbconnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const resetPassword = async (req, res) => {
  try {
    const { email, password, token } = req.body;
    if (!email || !password || !token) {
      res.status(400).json({
        message: "Missing parameters",
        status: 0,
      });
    } else {
      await jwt.verify(token, process.env.STUDENT_FORGOT_PASSWORD_SECRET);
      const searchStudent = `SELECT * FROM student_credentials WHERE email = ?`;
      const student = db.queryAsync(searchStudent, [email]);
      if (!student) {
        res.status(200).json({
          message: "Not found",
          status: 0,
        });
      } else {
        const hashedPassword = await bcrypt.hash(
          password,
          Number(process.env.SALT_ROUNDS)
        );
        const sql = `UPDATE student_credentials SET password = ? WHERE email = ?`;
        await db.queryAsync(sql, [hashedPassword, email]);
        res.status(200).json({
          message: "Password changed successfully",
          status: 1,
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

module.exports = resetPassword;
