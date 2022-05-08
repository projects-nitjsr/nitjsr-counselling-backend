const db = require("../../helpers/dbconnect");

const login = async (req, res) => {
  try {
    const regno = req.body.regno;
    const password = req.body.password;
    // const role = req.body.role;
    if (!regno || !password) {
      res.status(401).json({
        message: "Missing parameter",
        status: 0,
      });
    } else {
      let sql = `SELECT * from student_credentials where regno = ?`;
      const [student] = await db.queryAsync(sql, [regno]);
      if (!student) {
        res.status(200).json({
          message: "Bad Credentials",
          status: 0,
        });
      } else {
        let check = await bcrypt.compare(password.trim(), student.password);
        if (check) {
          let accessToken = jwt.sign(
            {
              regno: student.regno,
              role: "student",
            },
            process.env.SECRET
          );
          res.status(200).json({
            status: 1,
            accessToken,
            role: "student",
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
      message: "Internal Server Error " + err,
      status: 0,
    });
  }
};
module.exports = login;
