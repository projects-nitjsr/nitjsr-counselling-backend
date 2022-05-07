const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/:regNo", controllers.student.getStudentByRegNo);

module.exports = router;
