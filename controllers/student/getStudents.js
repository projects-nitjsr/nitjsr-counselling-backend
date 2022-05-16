const db = require("../../helpers/dbconnect");

const getStudents = async (req, res) => {
  try {
    const students = await db.queryAsync("SELECT * FROM student", []);

    if (students.length == 0) {
      throw new Error("No students found!");
    }

    res.status(200).json({ success: true, result: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getStudents;
