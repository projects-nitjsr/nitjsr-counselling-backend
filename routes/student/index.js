const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/:regNo", controllers.student.getStudentByRegNo);
router.get("/getstudents", controllers.student.getStudents);
router.get("/getstudentstatus/:regNo", controllers.student.getStudentStatus);
router.put(
  "/updatestudentstatus/:regNo",
  controllers.student.updateStudentStatus
);
router.delete("/deletestudent/:regNo", controllers.student.deleteStudent);

module.exports = router;
