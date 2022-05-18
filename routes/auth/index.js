const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/login", controllers.auth.studentLogin);
router.get("/admin/login", controllers.auth.adminLogin);
router.post("/student/forgotpassword", controllers.auth.studentForgotPassword);
router.post("/student/resetpassword", controllers.auth.studentResetPassword);
router.post("/admin/forgotpassword", controllers.auth.adminForgotPassword);
router.post("/admin/resetpassword", controllers.auth.adminResetPassword);
module.exports = router;
