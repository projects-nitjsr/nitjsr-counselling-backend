const db = require("../../helpers/dbconnect");
const seatAllocation = require("../../helpers/seatAllocation");
const q = require("q");
const mysql = require("mysql");

const allocate = async (req, res) => {
  try {
    // Get the initial list of students
    let studentMeritList = await db.queryAsync("SELECT * FROM student");

    // Get the list of colleges with their seats
    let initialCollegeSeatsWithId = await db.queryAsync(
      "SELECT * FROM colleges"
    );

    if (studentMeritList.length == 0) {
      throw new Error("No students found");
    }

    if (initialCollegeSeatsWithId.length == 0) {
      throw new Error("No colleges found");
    }

    // Take only those students who either don't have any seat or have floated their last seat
    studentMeritList = studentMeritList.filter(
      (student) =>
        student.currentSeatIndex === null || student.studentAction === "float"
    );

    // Prepare student merit list so as to pass to the seat allocation function
    studentMeritList = studentMeritList.map((student) => {
      const newStudent = {
        regNo: student.regno,
        generalRank: student.generalRank,
        category: student.category,
        categoryRank: student.categoryRank,
        preferences: student.preferences.split(" "),
        currentSeatIndex: student.currentSeatIndex,
        seatAllotmentCategory: student.seatAllotmentCategory,
      };

      return newStudent;
    });

    // Prepare collete list so as to pass to the seat allocation function
    let collegeSeatsWithId = {};

    initialCollegeSeatsWithId.forEach((college) => {
      collegeSeatsWithId[college.id] = {
        general_seats: college.general_seats,
        obc_seats: college.obc_seats,
        sc_seats: college.sc_seats,
        st_seats: college.st_seats,
        ews_seats: college.ews_seats,
        pwd_general_seats: college.pwd_general_seats,
        pwd_obc_seats: college.pwd_obc_seats,
        pwd_sc_seats: college.pwd_sc_seats,
        pwd_st_seats: college.pwd_st_seats,
        pwd_ews_seats: college.pwd_ews_seats,
      };
    });

    const result = seatAllocation(studentMeritList, collegeSeatsWithId);

    // Update student table with the new data
    let queries = "SET autocommit=0;START TRANSACTION;";
    const deferred = q.defer();

    studentMeritList.forEach((student) => {
      queries += mysql.format(
        "UPDATE student SET currentSeatIndex = ? seatAllotmentCategory = ? WHERE regno = ?; ",
        [student.currentSeatIndex, student.seatAllotmentCategory, student.regNo]
      );
    });

    queries += "COMMIT;SET autocommit=1;";

    db.query(queries, deferred.makeNodeResolver());

    // Update college table with the new data
    initialCollegeSeatsWithId = initialCollegeSeatsWithId.map((college) => {
      return {
        id: college.id,
        general_seats: collegeSeatsWithId[college.id].general_seats,
        obc_seats: collegeSeatsWithId[college.id].obc_seats,
        sc_seats: collegeSeatsWithId[college.id].sc_seats,
        st_seats: collegeSeatsWithId[college.id].st_seats,
        ews_seats: collegeSeatsWithId[college.id].ews_seats,
        pwd_general_seats: collegeSeatsWithId[college.id].pwd_general_seats,
        pwd_obc_seats: collegeSeatsWithId[college.id].pwd_obc_seats,
        pwd_sc_seats: collegeSeatsWithId[college.id].pwd_sc_seats,
        pwd_st_seats: collegeSeatsWithId[college.id].pwd_st_seats,
        pwd_ews_seats: collegeSeatsWithId[college.id].pwd_ews_seats,
      };
    });

    queries = "SET autocommit=0;START TRANSACTION;";

    initialCollegeSeatsWithId.forEach((college) => {
      queries += mysql.format(
        "UPDATE colleges SET general_seats = ?, obc_seats = ?, sc_seats = ?, st_seats = ?, ews_seats = ?, pwd_general_seats = ?, pwd_obc_seats = ?, pwd_sc_seats = ?, pwd_st_seats = ?, pwd_ews_seats = ? WHERE id = ?; ",
        [
          college.general_seats,
          college.obc_seats,
          college.sc_seats,
          college.st_seats,
          college.ews_seats,
          college.pwd_general_seats,
          college.pwd_obc_seats,
          college.pwd_sc_seats,
          college.pwd_st_seats,
          college.pwd_ews_seats,
          college.id,
        ]
      );
    });

    queries += "COMMIT;SET autocommit=1;";

    db.query(queries, deferred.makeNodeResolver());

    res.status(200).json({ success: true, message: "Seat allocation done" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = allocate;
