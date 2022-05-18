const jwt = require("jsonwebtoken");

module.exports.isStudent = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(401).json({
        message: "Not Authenticated",
        status: 0,
      });
    } else {
      const { regno, role } = jwt.decode(token);
      req.user = { regno: regno, role: student };
      if (role == "student") {
        next();
      } else {
        res.status(401).json({
          message: "Not Student",
          status: 0,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      status: 0,
    });
  }
};
