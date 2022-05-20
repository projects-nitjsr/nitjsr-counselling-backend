const db = require("../../helpers/dbconnect");

const getStudents = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  page--;
  const limit = parseInt(req.query.limit) || 30;
  const offset = page * limit;

  try {
    const students = await db.queryAsync(
      "SELECT * FROM student ORDER BY regno LIMIT = ? OFFSET = ?",
      [limit, offset]
    );

    if (students.length == 0) {
      throw new Error("No students found!");
    }

    res.status(200).json({ success: true, result: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getStudents;
