const router = require("express").Router();
const controllers = require("../../controllers");
<<<<<<< HEAD

router.get("/login", controllers.auth.studentLogin);
router.get("/admin/login", controllers.auth.adminLogin);
router.post("/student/forgotpassword", controllers.auth.studentForgotPassword);
router.post("/student/resetpassword", controllers.auth.studentResetPassword);
router.post("/student/verify", controllers.auth.studentVerify);
router.post("/student/signUp", controllers.auth.studentSignUp);
router.post("/admin/forgotpassword", controllers.auth.adminForgotPassword);
router.post("/admin/resetpassword", controllers.auth.adminResetPassword);
=======
const {
  isAuthenticatedAdmin,
} = require("../../middlewares/admin/isAuthenticatedAdmin");
const {
  isAuthenticatedStudent,
} = require("../../middlewares/student/isAuthenticatedStudent");
const validation = require("../../middlewares/validation");
const validationSchema = require("./validationSchema");

router.get(
  "/student/login",
  validation(validationSchema.studentLoginValidation),
  controllers.auth.studentLogin
);
router.get(
  "/student/logout",
  isAuthenticatedStudent,
  controllers.auth.studentLogout
);
router.get(
  "/admin/login",
  validation(validationSchema.adminLoginValidation),
  controllers.auth.adminLogin
);
router.get("/admin/logout", isAuthenticatedAdmin, controllers.auth.adminLogout);

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

>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
module.exports = router;
