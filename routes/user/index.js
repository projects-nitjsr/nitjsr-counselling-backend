const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/:id", controllers.user.getUserByRegNo);

module.exports = router;
