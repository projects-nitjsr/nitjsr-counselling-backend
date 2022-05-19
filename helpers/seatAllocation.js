const studentMeritList = [
  {
    regNo: "1",
    generalRank: 1,
    category: "obc",
    categoryRank: 1,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "2",
    generalRank: 3,
    category: "obc",
    categoryRank: 2,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "3",
    generalRank: 4,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "4",
    generalRank: 6,
    category: "sc",
    categoryRank: 1,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "5",
    generalRank: 7,
    category: "sc",
    categoryRank: 2,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "6",
    generalRank: 8,
    category: "obc",
    categoryRank: 3,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "7",
    generalRank: 9,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "8",
    generalRank: 10,
    category: "st",
    categoryRank: 1,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "9",
    generalRank: 11,
    category: "st",
    categoryRank: 2,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "10",
    generalRank: 12,
    category: "ews",
    categoryRank: 1,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "11",
    generalRank: 13,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
  {
    regNo: "12",
    generalRank: 14,
    category: "pwd_general",
    categoryRank: 1,
    preferences: ["1", "2", "3", "4"],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  },
];

const collegeSeatsWithId = {
  1: {
    general_seats: 8,
    obc_seats: 5,
    sc_seats: 3,
    st_seats: 2,
    ews_seats: 1,
    pwd_general_seats: 1,
  },
  2: {
    general_seats: 10,
    obc_seats: 5,
    sc_seats: 3,
    st_seats: 2,
    ews_seats: 1,
    pwd_general_seats: 0,
  },
  3: {
    general_seats: 10,
    obc_seats: 5,
    sc_seats: 3,
    st_seats: 2,
    ews_seats: 1,
    pwd_general_seats: 0,
  },
  4: {
    general_seats: 10,
    obc_seats: 5,
    sc_seats: 3,
    st_seats: 2,
    ews_seats: 1,
    pwd_general_seats: 0,
  },
};

const seatAllocation = (studentMeritList, collegeSeatsWithId) => {
  const finalAllocation = [];

  for (let j = 0; j < studentMeritList.length; ++j) {
    let generalPreference = null;
    let categoryPreference = null;
    const student = studentMeritList[j];
    console.log(student);

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

  return finalAllocation;
};

seatAllocation(studentMeritList, collegeSeatsWithId);
