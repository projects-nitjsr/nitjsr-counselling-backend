const jwt = require("jsonwebtoken");
module.exports.isAuthenticatedAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(200).json({
        message: "Not Authorized Admin",
        status: 0,
      });
    } else {
      jwt.verify(token, process.env.ADMIN_SECRET);
      next();
    }
  } catch (err) {
    res.status(200).json({
      message: "Not Authenticated Admin",
      status: 0,
    });
  }
};
