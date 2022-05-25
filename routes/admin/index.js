const router = require("express").Router();
const controller = require("../../controllers");
const {
  isAuthenticatedAdmin,
} = require("../../middlewares/admin/isAuthenticatedAdmin");
const centerIncharge = require("./centerIncharge");
const verifyingOfficer = require("./verifyingOfficer");

router.use("/centerIncharge", centerIncharge);
router.use("/verifyingOfficer", verifyingOfficer);

router.get(
  "/getlogs",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  controller.admin.getLogs
);
router.get(
  "/getadminlogs",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  controller.admin.getAdminLogs
);

module.exports = router;
