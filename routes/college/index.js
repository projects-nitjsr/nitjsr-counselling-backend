const router = require("express").Router();
const controllers = require("../../controllers");
<<<<<<< HEAD

router.get("/getcolleges", controllers.college.getCollegeList);
router.get("/getcollege/:id", controllers.college.getCollegeById);
router.delete("/deletecollege/:id", controllers.college.deleteCollegeById);
router.put("/updatecollege/:id", controllers.college.updateCollegeById);
=======
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
router.get("/", controllers.college.getCollegeList);
router.get("/:id", controllers.college.getCollegeById);
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
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b

module.exports = router;
