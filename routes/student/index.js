const router = require("express").Router();
const controllers = require("../../controllers");

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
  router.delete("/deletestudent/:regNo", controllers.student.deleteStudent);

module.exports = router;
