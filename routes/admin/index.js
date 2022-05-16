const router = require("express").Router();
const controllers = require("../../controllers");

router.post("/createCenterIncharge", controllers.admin.createCenterIncharge);
router.delete("/deleteCenterIncharge", controllers.admin.deleteCenterIncharge);
router.get("/getCenterIncharge", controllers.admin.getCenterIncharge);
router.post("/updateCenterIncharge", controllers.admin.updateCenterIncharge);

module.exports = router;
