const router = require("express").Router();
const college = require("./college");
const auth = require("./auth");
const student = require("./student");
const admin = require("./admin");
const result = require("./result");
const notice= require("./notice");

router.use("/auth", auth);
router.use("/student", student);
router.use("/college", college);
router.use("/admin", admin);
router.use("/result", result);
router.use("/notice",notice);

module.exports = router;
