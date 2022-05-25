const router = require("express").Router();
const controller = require("../../controllers");
const {
  isAuthenticatedAdmin,
} = require("../../middlewares/admin/isAuthenticatedAdmin");
const validation = require("../../middlewares/validation");
const validationSchema = require("./validationSchema");

router.get("/get", controller.notice.getNotices);
router.post(
  "/create",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  validation(validationSchema.createNoticeValidation),
  controller.notice.createNotice
);

module.exports = router;
