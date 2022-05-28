const db = require("../../helpers/dbconnect");
const seatAllocation = require("../../helpers/seatAllocation");
const q = require("q");
const mysql = require("mysql");
const categoryRejection = require("../../helpers/categoryRejection");

const phaseMeritListUpdate = (studentMeritList, phase) => {
  let queries = "SET autocommit=0;START TRANSACTION;";
  const deferred = q.defer();

  studentMeritList.forEach((student) => {
    queries += mysql.format(
      "INSERT INTO phase_merit_list (phase, regno) VALUES(?, ?);",
      [phase, student.regno]
    );
  });

  queries += "COMMIT;SET autocommit=1;";
  db.query(queries, deferred.makeNodeResolver());
};

const phaseResultUpdate = async (result, phase) => {
  let queries = "SET autocommit=0;START TRANSACTION;";

  result.forEach((res) => {
    queries += mysql.format(
      "INSERT INTO phase_result (phase, regno, college, category) VALUES(?, ?, ?, ?);",
      [phase, res.studentRegNo, res.allotedCollegeId, res.category]
    );
  });

  queries += "COMMIT;SET autocommit=1;";
  await db.queryAsync(queries);
};

const allocate = async (req, res) => {
  try {
    await categoryRejection();

    // Get the initial list of students
    let studentMeritList = await db.queryAsync("SELECT * FROM student");

    // Get the list of colleges with their seats
    let initialCollegeSeatsWithId = await db.queryAsync(
      "SELECT * FROM colleges"
    );

    // [{id:1,g_seats:12,}] => {1:{g_seats:12,}}

    if (studentMeritList.length == 0) {
      throw new Error("No students found");
    }

    if (initialCollegeSeatsWithId.length == 0) {
      throw new Error("No colleges found");
    }

    // Take only those students who either don't have any seat or have floated their last seat
    studentMeritList = studentMeritList.filter(
      (student) =>
        (student.currentSeatIndex === null &&
          student.paymentDetails !== null) ||
        student.studentAction === "float"
    );

    // Update phase_merit_list
    phaseMeritListUpdate(studentMeritList, req.allocationPhase);

    // Prepare student merit list so as to pass to the seat allocation function
    studentMeritList = studentMeritList.map((student) => {
      const newStudent = {
        regNo: student.regno,
        generalRank: student.generalRank,
        category: student.category,
        categoryRank: student.categoryRank,
        preferences: student.preferences.split(" "), // "1 2 3 4 5 6"
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

    // Update phase_result
    await phaseResultUpdate(result.finalAllocation, req.allocationPhase);

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

    queries += mysql.format(
      "UPDATE allocation_status SET status = ?, startTime = ? WHERE phase = ?;",
      ["completed", null, req.allocationPhase]
    );

    queries += "COMMIT;SET autocommit=1;";

    db.query(queries, deferred.makeNodeResolver());
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = async (req, res) => {
  const allocationPhase = req.allocationPhase;
  const allocationStatus = await db.queryAsync(
    "SELECT * FROM allocation_status WHERE phase = ?",
    [allocationPhase]
  );

  if (
    allocationStatus[0].status === "pending" ||
    allocationStatus[0].status === "failed"
  ) {
    allocate(req, res);
    await db.queryAsync(
      "UPDATE allocation_status SET status = 'started', startTime = ? WHERE phase = ?",
      [Date.now(), allocationPhase]
    );
    res.send({ success: true, message: "Result generation has been started." });
  } else if (allocationStatus[0].status === "started") {
    if (Date.now() - Number(allocationStatus[0].startTime) > 30 * 60000) {
      // Failed
      await db.queryAsync(
        "UPDATE allocation_status SET status = 'failed', startTime = ? WHERE phase = ?",
        [null, allocationPhase]
      );
      return res.send({
        success: false,
        message: "Result generation failed",
      });
    }
    res.send({
      success: true,
      message: "Result generation already in progress.",
    });
  }
};
