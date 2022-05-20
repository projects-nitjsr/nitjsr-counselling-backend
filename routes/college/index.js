const router = require("express").Router();
const controllers = require("../../controllers");
const {
  isAuthenticatedAdmin,
} = require("../../middlewares/admin/isAuthenticatedAdmin");
const validation = require("../../middlewares/validation");
const validationSchema = require("./validationSchema");

//please add route for creating college
router.post(
  "/create",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  validation(validationSchema.createCollegeValidation),
  controllers.college.createCollege
);
router.get("/get", controllers.college.getCollegeList);
router.get("/get/:id", controllers.college.getCollegeById);
router.delete(
  "/delete/:id",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  controllers.college.deleteCollegeById
);
router.put(
  "/update/:id",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  validation(validationSchema.updateCollegeValidation),
  controllers.college.updateCollegeById
);

module.exports = router;
