const db = require("../../helpers/dbconnect");
const mysql = require("mysql");
const q = require("q");

const updateStudentVerifyingCollege = async (req, res) => {
  const { verifyingCollegeWithRegNo } = req.body;
  const verifyingArray = [];

  for (let i = 0; i < verifyingCollegeWithRegNo.length; ++i) {
    verifyingArray.push([
      verifyingCollegeWithRegNo[i].collegeId,
      verifyingCollegeWithRegNo[i].regNo,
    ]);
  }

  try {
    let queries = "SET autocommit=0;START TRANSACTION;";
    const deferred = q.defer();

    verifyingArray.forEach(function (item) {
      queries += mysql.format(
        "UPDATE student_status SET verifying_college = ? WHERE regno = ?; ",
        item
      );
    });

    queries += "COMMIT;SET autocommit=1;";

    db.query(queries, deferred.makeNodeResolver());

    res.status(200).json({ success: true, message: "Update successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = updateStudentVerifyingCollege;
