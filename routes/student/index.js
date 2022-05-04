const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/:regNo", controllers.user.getStudentByRegNo);

module.exports = router;
