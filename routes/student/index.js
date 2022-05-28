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
  validation(validationSchema.getstudentsbyverifingcollegeValidation),
  controllers.student.getStudentsByVerifingCollege
);
router.get(
  "/verifyingofficer",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  validation(validationSchema.getstudentsbyverifingofficerValidation),
  controllers.student.getStudentsByVeryfingOfficer
);

router.get("/", isAuthenticatedAdmin, controllers.student.getStudents);
router.put(
  "/verify",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["vo"]),
  validation(validationSchema.verifyStudentValidation),
  controllers.verify.verifyStudent
);
router.put(
  "/reject",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["vo"]),
  validation(validationSchema.rejectStudentValidation),
  controllers.verify.rejectStudent
);
router.put(
  "/confirm",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  validation(validationSchema.confirmDecisionValidation),
  controllers.verify.confirmDecision
);
router.put(
  "/deny",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["ci"]),
  validation(validationSchema.denyDecisionValidation),
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
  "/updatestudentdata",
  multerSingle,
  validation(validationSchema.updateStudentDataValidation),
  controllers.student.updateStudentData
);
router.delete(
  "/deletestudent/:regNo",
  isAuthenticatedAdmin,
  controllers.student.deleteStudent
);
router.post(
  "/studentAction",
  validation(validationSchema.studentActionValidation),
  controllers.student.studentAction
);
router.post(
  "/allocate",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  controllers.student.allocate
);
router.post(
  "/uploadAttachment",
  (req, res, next) =>
    multerMiddleware(req, res, next, [
      { name: "profileImage", maxCount: 1 },
      { name: "signature", maxCount: 1 },
      { name: "aadhaar", maxCount: 1 },
      { name: "classTen", maxCount: 1 },
      { name: "classTwelve", maxCount: 1 },
      { name: "firstYear", maxCount: 1 },
      { name: "secondYear", maxCount: 1 },
      { name: "thirdYear", maxCount: 1 },
    ]),
  controllers.student.attachmentSaver
);

module.exports = router;
