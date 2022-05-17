const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/login", controllers.auth.studentLogin);
router.get("/admin/login", controllers.auth.adminLogin);

module.exports = router;
