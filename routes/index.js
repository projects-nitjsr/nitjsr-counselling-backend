const router = require("express").Router();
const college = require("./college");
const auth = require("./auth");
const student = require("./student");
const result = require("./result");

router.use("/auth", auth);
router.use("/student", student);
router.use("/college", college);
router.use("/result", result);

module.exports = router;
