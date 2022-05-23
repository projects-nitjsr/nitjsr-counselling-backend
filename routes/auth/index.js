const router = require("express").Router();
const controllers = require("../../controllers");
const validation = require("../../middlewares/validation");
const validationSchema = require("./validationSchema");

router.get(
  "/student/login",
  validation(validationSchema.studentLoginValidation),
  controllers.auth.studentLogin
);
router.post("/student/logout", controllers.auth.studentLogout);
router.get(
  "/admin/login",
  validation(validationSchema.adminLoginValidation),
  controllers.auth.adminLogin
);
router.post(
  "/student/forgotpassword",
  validation(validationSchema.forgotPasswordValidation),
  controllers.auth.studentForgotPassword
);
router.post(
  "/student/resetpassword",
  validation(validationSchema.resetPasswordValidation),
  controllers.auth.studentResetPassword
);
router.post("/student/verify", controllers.auth.studentVerify);
router.post("/student/signup", controllers.auth.studentSignUp);
router.post(
  "/admin/forgotpassword",
  validation(validationSchema.forgotPasswordValidationAdmin),
  controllers.auth.adminForgotPassword
);
router.post(
  "/admin/resetpassword",
  validation(validationSchema.resetPasswordValidation),
  controllers.auth.adminResetPassword
);

module.exports = router;
