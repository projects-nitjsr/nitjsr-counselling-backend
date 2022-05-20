const router = require("express").Router();
const controllers = require("../../controllers");
const validationSchema = require("./validationSchema");
const validation = require("../../middlewares/validation");
const multerSingle = require("../../middlewares/multerSingle");

router.get(
  "/verifyingcollege",
  validation(validationSchema.getStudentsByVerifyingCollegeValidation),
  controllers.student.getStudentsByVerifingCollege
);
router.get(
  "/verifyingofficer",
  validation(validationSchema.getStudentsByVerifingOfficerValidation),
  controllers.student.getStudentsByVeryfingOfficer
);
router.get("/", controllers.student.getStudents);
router.put("/verify", controllers.verify.verifyStudent);
router.put("/reject", controllers.verify.rejectStudent);
router.put("/confirm", controllers.verify.confirmDecision);
router.put("/deny", controllers.verify.denyDecision);
router.get("/:regNo", controllers.student.getStudentByRegNo);
router.get("/getstudentstatus/:regNo", controllers.student.getStudentStatus);
router.put(
  "/updatestudentverifyingcollege/:regNo",
  validation(validationSchema.updateStudentVerifyingCollegeValidation),
  controllers.student.updateStudentVerifyingCollege
);
router.put(
  "/updatestudentverifyingofficer/:regNo",
  validation(validationSchema.updateStudentVerifyingOfficerValidation),
  controllers.student.updateStudentVerifyingOfficer
);
router.post(
  "/updatestudentimage/:regNo",
  multerSingle,
  controllers.student.updateStudentImage
);
router.delete("/deletestudent/:regNo", controllers.student.deleteStudent);

module.exports = router;
