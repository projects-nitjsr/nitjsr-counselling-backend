const router = require("express").Router();
const controllers = require("../../../controllers");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./validationSchema");
//create Center Incharge route
router.post(
  "/create",
  validation(validationSchema.createCenterInchargeValidation),
  controllers.admin.createCenterIncharge
);
// delete Center Incharge route
router.delete(
  "/delete",
  validation(validationSchema.deleteCenterInchargeValidation),
  controllers.admin.deleteCenterIncharge
);
// get Center Incharge route
router.get("/", controllers.admin.getCenterIncharge);
//update Center Incharge Details Route
router.post(
  "/update",
  validation(validationSchema.updateCenterInchargeValidation),
  controllers.admin.updateCenterIncharge
);

module.exports = router;
