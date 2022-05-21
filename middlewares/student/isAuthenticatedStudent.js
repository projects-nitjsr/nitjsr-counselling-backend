const jwt = require("jsonwebtoken");

module.exports.isAuthenticatedStudent = (req, res, next) => {
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
      if (role == "student") {
        next();
      } else {
        res.status(401).json({
          message: "Not Authorised",
          status: 0,
        });
      }
    }
  } catch (err) {
    res.status(200).json({
      message: "Not Authenticated",
      status: 0,
    });
  }
};
