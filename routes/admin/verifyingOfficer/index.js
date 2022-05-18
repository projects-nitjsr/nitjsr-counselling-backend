const router = require("express").Router();
const controllers = require("../../../controllers");
const multerSingle = require("../../../middlewares/multerSingle");

router.post("/create", multerSingle, controllers.admin.createVerifyingOfficer);
router.delete("/:email", controllers.admin.deleteVerifyingOfficer);
router.get("/", controllers.admin.getVerifyingOfficer);
router.get("/:email", controllers.admin.getVerifyingOfficerByEmail);
router.get("/college/:id", controllers.admin.getVerifyingOfficerByCollegeId);
router.post("/update", multerSingle, controllers.admin.updateVerifyingOfficer);

module.exports = router;
