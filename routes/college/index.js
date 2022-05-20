const router = require("express").Router();
const controllers = require("../../controllers");
const validation = require("../../middlewares/validation");
const validationSchema = require("./validationSchema");

//please add route for creating college
router.post(
  "/create",
  validation(validationSchema.createCollegeValidation),
  controllers.college.createCollege
);
router.get("/get", controllers.college.getCollegeList);
router.get("/get/:id", controllers.college.getCollegeById);
router.delete("/delete/:id", controllers.college.deleteCollegeById);
router.put(
  "/update/:id",
  validation(validationSchema.updateCollegeValidation),
  controllers.college.updateCollegeById
);

module.exports = router;
