const router = require("express").Router();
const controllers = require("../../../controllers");
const multerSingle = require("../../../middlewares/multerSingle");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./validationSchema");
router.post(
  "/create",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  validation(validationSchema.createVerifyingOfficerValidation),
  multerSingle,
  controllers.admin.createVerifyingOfficer
);
router.delete(
  "/:email",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  validation(validationSchema.deleteVerifyingOfficerValidation),
  controllers.admin.deleteVerifyingOfficer
);
router.get(
  "/",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci", "c", "s"]),
  controllers.admin.getVerifyingOfficer
);

router.get(
  "/:email",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci", "c", "s"]),
  controllers.admin.getVerifyingOfficerByEmail
);
router.get(
  "/college/:id",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci", "c", "s"]),
  controllers.admin.getVerifyingOfficerByCollegeId
);
router.post(
  "/update",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  validation(validationSchema.updateVerifyingOfficerValidation),
  multerSingle,
  controllers.admin.updateVerifyingOfficer
);

module.exports = router;
