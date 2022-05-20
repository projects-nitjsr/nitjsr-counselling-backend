const router = require("express").Router();
const controllers = require("../../../controllers");
const multerSingle = require("../../../middlewares/multerSingle");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./validationSchema");
router.post(
  "/create",
  validation(validationSchema.createVerifyingOfficerValidation),
  multerSingle,
  controllers.admin.createVerifyingOfficer
);
router.delete(
  "/:email",
  validation(validationSchema.deleteVerifyingOfficerValidation),
  controllers.admin.deleteVerifyingOfficer
);
router.get("/", controllers.admin.getVerifyingOfficer);
router.get("/:email", controllers.admin.getVerifyingOfficerByEmail);
router.get("/college/:id", controllers.admin.getVerifyingOfficerByCollegeId);
router.post(
  "/update",
  validation(validationSchema.updateVerifyingOfficerValidation),
  multerSingle,
  controllers.admin.updateVerifyingOfficer
);

module.exports = router;
