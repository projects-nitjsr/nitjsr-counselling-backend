const studentMeritList = require("./../constants/studentMeritList");
const collegeSeatsWithId = require("./../constants/collegeSeatsWithId");
const fs = require("fs");

studentMeritList.sort((a, b) => a.generalRank - b.generalRank);

//console.log(studentMeritList);

const seatAllocation = (studentMeritList, collegeSeatsWithId) => {
  const finalAllocation = [];

  for (let j = 0; j < studentMeritList.length; ++j) {
    let generalPreference = null;
    let categoryPreference = null;
    const student = studentMeritList[j];
    //console.log(student);

    for (let i = 0; i < student.preferences.length; ++i) {
      if (collegeSeatsWithId[student.preferences[i]].general_seats > 0) {
        generalPreference = i;
        break;
      }
    }

    if (student.category) {
      for (let i = 0; i < student.preferences.length; ++i) {
        if (
          collegeSeatsWithId[student.preferences[i]][
            `${student.category}_seats`
          ] > 0
        ) {
          categoryPreference = i;
          break;
        }
      }
    }

    let preference = null;
    if (generalPreference === null && categoryPreference === null) continue;
    else if (generalPreference === null) preference = categoryPreference;
    else if (categoryPreference === null) preference = generalPreference;
    else preference = Math.min(generalPreference, categoryPreference);

    // Check if this allotment is better than the last allotment or there was no last allotment
    if (
      student.currentSeatIndex === null ||
      preference < student.currentSeatIndex
    ) {
      if (student.currentSeatIndex === null) {
        if (preference === generalPreference) {
          --collegeSeatsWithId[student.preferences[preference]].general_seats;
          finalAllocation.push({
            studentRegNo: student.regNo,
            allotedCollegeId: student.preferences[preference],
            category: "general",
          });
        } else {
          --collegeSeatsWithId[student.preferences[preference]][
            `${student.category}_seats`
          ];
          finalAllocation.push({
            studentRegNo: student.regNo,
            allotedCollegeId: student.preferences[preference],
            category: student.category,
          });
        }
      } else {
        ++collegeSeatsWithId[student.preferences[student.currentSeatIndex]][
          `${student.seatAllotmentCategory}_seats`
        ];
        if (preference === generalPreference) {
          --collegeSeatsWithId[student.preferences[preference]].general_seats;
          finalAllocation.push({
            studentRegNo: student.regNo,
            allotedCollegeId: student.preferences[preference],
            category: "general",
          });
        } else {
          --collegeSeatsWithId[student.preferences[preference]][
            `${student.category}_seats`
          ];
          finalAllocation.push({
            studentRegNo: student.regNo,
            allotedCollegeId: student.preferences[preference],
            category: student.category,
          });
        }
      }
    }
  }

  console.log(finalAllocation);

  const jsonString = JSON.stringify(finalAllocation);

  fs.writeFile("./finalAllocation.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });

  return finalAllocation;
};

seatAllocation(studentMeritList, collegeSeatsWithId);
