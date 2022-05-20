const router = require("express").Router();
const controllers = require("../../controllers");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./validationSchema");

//please add route for creating college
router.post(
  "./createCollege",
  validation(validationSchema.createCollegeValidation),
  controllers.college.createCollege
);
router.get("/getcolleges", controllers.college.getCollegeList);
router.get("/getcollege/:id", controllers.college.getCollegeById);
router.delete("/deletecollege/:id", controllers.college.deleteCollegeById);
router.put(
  "/updatecollege/:id",
  validation(validationSchema.updateCollegeValidation),
  controllers.college.updateCollegeById
);

module.exports = router;
