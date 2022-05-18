const router = require("express").Router();
const controller = require("../../controllers");
const centerIncharge = require("./centerIncharge");
const verifyingOfficer = require("./verifyingOfficer");

router.use("/centerIncharge", centerIncharge);
router.use("/verifyingOfficer", verifyingOfficer);
router.get("/getlogs/:noOfLogs", controller.admin.getLogs);
router.get("/getadminlogs/:noOfLogs", controller.admin.getAdminLogs);

module.exports = router;
