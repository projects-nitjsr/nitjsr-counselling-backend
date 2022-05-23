const router = require("express").Router();
const controllers = require("../../controllers");
const {
  isAuthenticatedAdmin,
} = require("../../middlewares/admin/isAuthenticatedAdmin");
const validationSchema = require("./validationSchema");
const validation = require("../../middlewares/validation");
const multerSingle = require("../../middlewares/multerSingle");

router.get(
  "/verifyingcollege",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  validation(validationSchema.getStudentsByVerifyingCollegeValidation),
  controllers.student.getStudentsByVerifingCollege
);
router.get(
  "/verifyingofficer",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  controllers.student.getStudentsByVeryfingOfficer
);

router.get("/", isAuthenticatedAdmin, controllers.student.getStudents);
router.put(
  "/verify",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["vo"]),
  controllers.verify.verifyStudent
);
router.put(
  "/reject",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["vo"]),
  controllers.verify.rejectStudent
);
router.put(
  "/confirm",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  controllers.verify.confirmDecision
);
router.put(
  "/deny",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  controllers.verify.denyDecision
);
router.get(
  "/:regNo",
  isAuthenticatedAdmin,
  controllers.student.getStudentByRegNo
);
router.get(
  "/getstudentstatus/:regNo",
  isAuthenticatedAdmin,
  controllers.student.getStudentStatus
);
router.put(
  "/updatestudentverifyingcollege",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  validation(validationSchema.updateStudentVerifyingCollegeValidation),
  controllers.student.updateStudentVerifyingCollege
);
router.put(
  "/updatestudentverifyingofficer",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  validation(validationSchema.updateStudentVerifyingOfficerValidation),
  controllers.student.updateStudentVerifyingOfficer
);
router.post(
  "/updatestudentimage/:regNo",
  multerSingle,
  controllers.student.updateStudentImage
);
router.delete(
  "/deletestudent/:regNo",
  isAuthenticatedAdmin,
  controllers.student.deleteStudent
);

module.exports = router;
