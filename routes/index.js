const router = require("express").Router();
const college = require("./college");
const auth = require("./auth");
const student = require("./student");
<<<<<<< HEAD
const admin = require("./admin");
=======
const result = require("./result");
>>>>>>> 0aeb86bca4d88fd1ddeb8eca3c70805762c30dcc

router.use("/auth", auth);
router.use("/student", student);
router.use("/college", college);
<<<<<<< HEAD
router.use("/admin", admin);
=======
router.use("/result", result);
>>>>>>> 0aeb86bca4d88fd1ddeb8eca3c70805762c30dcc

module.exports = router;
