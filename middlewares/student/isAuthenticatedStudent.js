const jwt = require("jsonwebtoken");

module.exports.isAuthenticatedStudent = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(200).json({
        message: "Not Authorized Student",
        status: 0,
      });
    } else {
      jwt.verify(token, process.env.STUDENT_SECRET);
      next();
    }
  } catch (err) {
    res.status(200).json({
      message: "Not Authenticated Student",
      status: 0,
    });
  }
};
