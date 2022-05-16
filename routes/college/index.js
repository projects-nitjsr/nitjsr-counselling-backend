const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/getcolleges", controllers.college.getCollegeList);
router.get("/getcollege/:id", controllers.college.getCollegeById);
router.get("/deletecollege/:id", controllers.college.deleteCollegeById);
router.get("/updatecollege/:id", controllers.college.updateCollegeById);

module.exports = router;
