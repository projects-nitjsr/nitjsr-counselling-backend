const router = require("express").Router();
const controller = require("../../controllers");
<<<<<<< HEAD

router.get("/", controller.notice.getNotices);
router.post("/", controller.notice.createNotice);
=======
const {
  isAuthenticatedAdmin,
} = require("../../middlewares/admin/isAuthenticatedAdmin");
const validation = require("../../middlewares/validation");
const validationSchema = require("./validationSchema");
router.get("/", controller.notice.getNotices);
router.post(
  "/",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  validation(validationSchema.createNoticeValidation),
  controller.notice.createNotice
);
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b

module.exports = router;
