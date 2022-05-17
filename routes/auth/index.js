const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/login", controllers.auth.studentLogin);
router.get("/admin/login", controllers.auth.adminLogin);
router.post("/admin/forgotpassword", controllers.auth.adminForgotPassword);
router.post("/admin/resetpassword", controllers.auth.adminResetPassword);
module.exports = router;


