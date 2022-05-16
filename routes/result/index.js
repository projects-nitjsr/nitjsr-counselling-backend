const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/", controllers.result.getResult);
router.get("/:id", controllers.result.getStudentResult);

module.exports = router;
