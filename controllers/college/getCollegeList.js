const db = require("../../helpers/dbconnect");

const getCollegeList = async (req, res) => {
  try {
    const collegeList = await db.queryAsync("SELECT * FROM colleges", []);

    if (collegeList.length == 0) {
      throw new Error("College List Empty!");
    }

    res.status(200).json({ success: true, result: collegeList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = getCollegeList;