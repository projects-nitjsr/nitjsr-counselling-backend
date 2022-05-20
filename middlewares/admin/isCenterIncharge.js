const jwt = require("jsonwebtoken");
module.exports.isCenterIncharge = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(401).json({
        message: "Not Authenticated",
        status: 0,
      });
    } else {
      const { designation, email } = jwt.decode(token);
      req.user = { email: email, designation: designation };

      if (designation == "ci") {
        next();
      } else {
        res.status(401).json({
          message: "Not Center Incharge",
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
