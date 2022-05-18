const router = require("express").Router();
const centerIncharge = require("./centerIncharge");
const verifyingOfficer = require("./verifyingOfficer");

router.use("/centerIncharge", centerIncharge);
router.use("/verifyingOfficer", verifyingOfficer);

module.exports = router;
