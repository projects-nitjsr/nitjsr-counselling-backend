const router = require("express").Router();
const controllers = require("../../../controllers");

router.post("/create", controllers.admin.createCenterIncharge);
router.delete("/delete", controllers.admin.deleteCenterIncharge);
router.get("/", controllers.admin.getCenterIncharge);
router.post("/update", controllers.admin.updateCenterIncharge);

module.exports = router;
