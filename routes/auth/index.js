const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.auth.signup);

module.exports = router;


