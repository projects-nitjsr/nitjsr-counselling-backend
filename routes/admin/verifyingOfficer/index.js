const router = require("express").Router();
const controllers = require("../../../controllers");
const multerSingle = require("../../../middlewares/multerSingle");
<<<<<<< HEAD

router.post("/create", multerSingle, controllers.admin.createVerifyingOfficer);
router.delete("/:email", controllers.admin.deleteVerifyingOfficer);
router.get("/", controllers.admin.getVerifyingOfficer);
router.get("/:email", controllers.admin.getVerifyingOfficerByEmail);
router.get("/college/:id", controllers.admin.getVerifyingOfficerByCollegeId);
router.post("/update", multerSingle, controllers.admin.updateVerifyingOfficer);
=======
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
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b

module.exports = router;
