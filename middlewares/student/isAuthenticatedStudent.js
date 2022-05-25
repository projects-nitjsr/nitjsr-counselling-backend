const jwt = require("jsonwebtoken");

module.exports.isAuthenticatedStudent = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(200).json({
        message: "Not Authenticated",
        status: 0,
      });
    } else {
      const { regno, role } = jwt.verify(token, process.env.STUDENT_SECRET);
      req.user = { regno: regno, role: student };
      const sql = "SELECT token FROM student_credentials WHERE regno = ?";
      const [student] = await db.queryAsync(sql, [regno]);
      if (!student) {
        throw new Error("Not Authenticated");
      } else {
        if (student.token == null) {
          throw new Error("Not Authenticated");
        } else {
          if (role == "student") {
            next();
          } else {
            throw new Error("Not Authorised");
          }
        }
      }
    }
  } catch (err) {
    res.status(200).json({
      message: err.message,
      status: 0,
    });
  }
};
