const router = require("express").Router();
const centerIncharge = require("./centerIncharge");
router.use("/centerIncharge", centerIncharge);

module.exports = router;
