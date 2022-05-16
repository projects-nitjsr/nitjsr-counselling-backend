const router = require("express").Router();
const controllers = require("../../controllers");

router.post("/", controllers.admin.createCenterIncharge);

module.exports = router;
