const db = require("../../../helpers/dbconnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerNewUser = async (req, res) => {
  try {
    const { regno, password, token } = req.body;
    if (!regno || !password || !token) {
      res.status(400).json({
        message: "Missing parameters",
        status: 0,
      });
    } else {
      await jwt.verify(token, process.env.STUDENT_SIGNUP_SECRET);
<<<<<<< HEAD
      const searchStudent = `SELECT * FROM student_credentials WHERE email = ?`;
      const student = db.queryAsync(searchStudent, [email]);
      if (!student) {
=======
      const searchStudent = `SELECT * FROM student WHERE regno = ?`;
      const student = await db.queryAsync(searchStudent, [regno]);
      if (student.length == 0) {
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
        res.status(200).json({
          message: "Student Not found",
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
        const sql = `INSERT INTO student_credentials (regno,password,token) 
        VALUES 
        (?,?,null)`;
        await db.queryAsync(sql, [student[0].regno, hashedPassword]);
        console.log(res);
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
        res.status(200).json({
          message: "Student Signed up successfully",
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

module.exports = registerNewUser;
