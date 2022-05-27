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
      const searchStudent = `SELECT * FROM student WHERE regno = ?`;
      const student = await db.queryAsync(searchStudent, [regno]);
      if (student.length == 0) {
        res.status(200).json({
          message: "Student Not found",
          status: 0,
        });
      } else {
        const hashedPassword = await bcrypt.hash(
          password,
          Number(process.env.SALT_ROUNDS)
        );
        const sql = `INSERT INTO student_credentials (regno,password,token) 
        VALUES 
        (?,?,null)`;
        await db.queryAsync(sql, [student[0].regno, hashedPassword]);

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
