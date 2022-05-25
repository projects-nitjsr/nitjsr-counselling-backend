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
<<<<<<< HEAD
      const searchStudent = `SELECT * FROM student_credentials WHERE email = ?`;
      const student = db.queryAsync(searchStudent, [email]);
      if (!student) {
=======
      const searchStudent = `SELECT * FROM student WHERE email = ?`;
      const student = await db.queryAsync(searchStudent, [email]);
      if (student.length == 0) {
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
        res.status(200).json({
          message: "Student not found",
          status: 0,
        });
      } else {
        const hashedPassword = await bcrypt.hash(
          password,
          Number(process.env.SALT_ROUNDS)
        );
<<<<<<< HEAD
        const sql = `UPDATE student_credentials SET password = ? WHERE email = ?`;
        await db.queryAsync(sql, [hashedPassword, email]);
=======
        console.log(hashedPassword);
        const sql = `UPDATE student_credentials SET password = ? WHERE regno = ?`;
        await db.queryAsync(sql, [hashedPassword, student[0].regno]);
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
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
