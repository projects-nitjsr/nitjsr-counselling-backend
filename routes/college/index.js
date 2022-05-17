const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/:id", controllers.college.getCollegeById);

module.exports = router;
