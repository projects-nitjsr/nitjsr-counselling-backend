const router = require("express").Router();
const controllers = require("../../../controllers");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./validationSchema");
<<<<<<< HEAD
//create Center Incharge route
router.post(
  "/create",
=======
const multerSingle = require("../../../middlewares/multerSingle");
const {
  isAuthenticatedAdmin,
} = require("../../../middlewares/admin/isAuthenticatedAdmin");

//create Center Incharge route
router.post(
  "/create",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  multerSingle,
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
  validation(validationSchema.createCenterInchargeValidation),
  controllers.admin.createCenterIncharge
);
// delete Center Incharge route
router.delete(
  "/delete",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  validation(validationSchema.deleteCenterInchargeValidation),
  controllers.admin.deleteCenterIncharge
);
// get Center Incharge route
router.get(
  "/",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  controllers.admin.getCenterIncharge
);
//update Center Incharge Details Route
router.post(
  "/update",
<<<<<<< HEAD
=======
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  multerSingle,
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
  validation(validationSchema.updateCenterInchargeValidation),
  controllers.admin.updateCenterIncharge
);

module.exports = router;
