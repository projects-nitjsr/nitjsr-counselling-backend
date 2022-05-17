const router = require("express").Router();
const controller = require("../../controllers")
const centerIncharge = require("./centerIncharge");
router.use("/centerIncharge", centerIncharge);
router.get("/getlogs/:noOfLogs",controller.admin.getLogs);
router.get("/getadminlogs/:noOfLogs",controller.admin.getAdminLogs);

module.exports = router;
