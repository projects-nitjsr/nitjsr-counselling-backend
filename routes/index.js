const router = require("express").Router();
const auth = require("./auth");
const student = require("./student");

router.use("/auth", auth);
router.use("/student", student);

module.exports = router;
