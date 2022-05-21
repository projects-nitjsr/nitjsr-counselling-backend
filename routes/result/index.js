const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/", controllers.result.getResult);
router.get("/:regNo", controllers.result.getStudentResultByRegNo);

module.exports = router;
