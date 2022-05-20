const jwt = require("jsonwebtoken");

//Usage----------------------------------------------------------
//(req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
//[roles] contains admins which can access the particular route
//req.user = {designation, email}

module.exports.isAuthenticatedAdmin = (
  req,
  res,
  next,
  roles = ["vo", "ci", "s", "c"]
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.status(200).json({
        message: "Not Authenticated",
        status: 0,
      });
    } else {
      const { designation, email } = jwt.verify(
        token,
        process.env.ADMIN_SECRET
      );
      req.user = { email: email, designation: designation };
      if (roles?.includes(designation)) {
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
