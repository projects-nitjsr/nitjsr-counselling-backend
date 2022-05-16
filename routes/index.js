const router = require("express").Router();
const college = require("./college");
const auth = require("./auth");
const student = require("./student");
const admin = require("./admin");

router.use("/auth", auth);
router.use("/student", student);
router.use("/college", college);
router.use("/admin", admin);

module.exports = router;
