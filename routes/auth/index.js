const router = require("express").Router();
const controllers = require("../../controllers");
const validation = require("../../middlewares/validation");
const validationSchema = require("./validationSchema");
router.get(
  "/login",
  validation(validationSchema.studentLoginValidation),
  controllers.auth.studentLogin
);
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
router.post(
  "/admin/forgotpassword",
  validation(validationSchema.forgotPasswordValidation),
  controllers.auth.adminForgotPassword
);
router.post(
  "/admin/resetpassword",
  validation(validationSchema.resetPasswordValidation),
  controllers.auth.adminResetPassword
);
module.exports = router;
