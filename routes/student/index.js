const router = require("express").Router();
const controllers = require("../../controllers");
const multerSingle = require("../../../middlewares/multerSingle");

router.get(
  "/verifyingcollege",
  controllers.student.getStudentsByVerifingCollege
);
router.get(
  "/verifyingofficer",
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
  "/updatestudentstatus/:regNo",
  controllers.student.updateStudentStatus
  );
router.post(
  "/updatestudentimage/:regNo",
  multerSingle,
  controllers.student.updateStudentImage
);
router.delete("/deletestudent/:regNo", controllers.student.deleteStudent);

module.exports = router;
