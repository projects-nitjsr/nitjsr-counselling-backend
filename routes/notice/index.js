const router = require("express").Router();
const controller = require("../../controllers");

router.get("/", controller.notice.getNotices);
router.post("/", controller.notice.createNotice);

module.exports = router;
