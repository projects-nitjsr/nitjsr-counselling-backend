const router = require("express").Router();
const college = require("./college");
const auth = require("./auth");
const student = require("./student");

router.use("/auth", auth);
router.use("/student", student);
router.use("/college", college);

module.exports = router;
