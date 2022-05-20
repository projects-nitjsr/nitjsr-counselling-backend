const router = require("express").Router();
const controller = require("../../controllers");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./validationSchema");
router.get("/", controller.notice.getNotices);
router.post(
  "/",
  validation(validationSchema.createNoticeValidation),
  controller.notice.createNotice
);

module.exports = router;
