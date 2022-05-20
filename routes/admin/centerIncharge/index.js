const router = require("express").Router();
const controllers = require("../../../controllers");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./validationSchema");
const multerSingle = require("../../../middlewares/multerSingle");
const {
  isAuthenticatedAdmin,
} = require("../../../middlewares/admin/isAuthenticatedAdmin");

//create Center Incharge route
router.post(
  "/create",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  multerSingle,
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
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  multerSingle,
  validation(validationSchema.updateCenterInchargeValidation),
  controllers.admin.updateCenterIncharge
);

module.exports = router;
