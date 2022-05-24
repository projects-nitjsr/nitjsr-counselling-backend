const jwt = require("jsonwebtoken");
const db = require("../../helpers/dbconnect");
//Usage----------------------------------------------------------
//(req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
//[roles] contains admins which can access the particular route
//req.user = {designation, email}

module.exports.isAuthenticatedAdmin = async (
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

      const sql = "SELECT token FROM admin_credentials WHERE email = ?";
      const [admin] = await db.queryAsync(sql, [email]);
      if (!admin) {
        throw new Error("Not Authenticated");
      } else {
        if (admin.token == null) {
          throw new Error("Not Authenticated");
        } else {
          if (roles?.includes(designation)) {
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
