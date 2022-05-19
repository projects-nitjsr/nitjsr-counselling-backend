//students preference list
const studentList = [
  {
    regno: "10001",
    generalRank: "1",
    category: "obc",
    categoryRank: "1",
    preferences: ["1001", "1002", "1003"],
    seatStatus: "freeze",
  },
];

//meritList of Students

const meritStudentList = [
  {
    regno: "10001",
    generalRank: "1",
    category: "obc",
    categoryRank: "1",
    preferences: ["1001", "1002", "1003"],
    currentCollege: 0,
  },
];

//college total seat list
const collegeTotalSeats = [
  {
    id: "1001",
    general_seats: 100,
    obc_seats: 5,
    sc_seats: 4,
    st_seats: 1,
    pwd_seats: 0,
    ews_seats: 2,
  },
];

//college avilable seat list
const collegeAvilableSeatsObject = {
  1001: {
    general_seats: 80,
    obc_seats: 3,
    sc_seats: 2,
    st_seats: 0,
    pwd_seats: 0,
    ews_seats: 2,
  },
};
const firstPhaseResult = [{ regno: "10001", college: "1001", category: "" }];
const finalResult = [{ regno: "10001", college: "1001", categogy: "" }];

`####################### ALGORITHM ##########################
  
  ---------------------------------------------------------------
  ---------------------------------------------------------------
  1nd phase Result Generation
  ---------------------------------------------------------------
  ---------------------------------------------------------------
  
  step 0: add students to meritList if seatStatus == float || null
  Step 1: sort meritStudentList on the basis of generalRank
  Step 2: loop through meritStudentList
  for each student
  {
  check college for generalRank & categoryRank using collegeAvilableSeatsObject
  allotedCollege = min(generalRankCollege, categoryRankCollege)
  store allotedcollege to firstPhaseResult
  decrement no of seats of category from collegeAvilableSeatsObject
  }
  
  student Action
  -----------------------------
  
  -student can Freeze, Reject, Float
  
  ********if student freeze*******
  
  update seatStatus & currentCollege in studentList table
  add student with college to finalResult table
  remove student from meritStudentList
  
  *********if student reject*******
  
  update seatsStatus & currentCollege in studentList table
  increament seat no in avilableCollegeSeat according to category
  remove student from meritStudentList
  
  **********if student Float*******
  
  update seatStaus & currentCollege in meritStudentList table
  
  **********if student do nothing*******
  
  it is equivalent to reject
  
  ---------------------------------------------------------------
  ---------------------------------------------------------------
  2nd phase Result Generation
  ---------------------------------------------------------------
  ---------------------------------------------------------------
  
  Step 1: loop through meritStudentList
  for each student
  {
  
  check college for generalRank & categoryRank using collegeAvilableSeatsObject
  allotedCollege = min(generalRankCollege, categoryRankCollege)
  
  if (allotedCollege < currentCollege)
  {store allotedcollege to secondPhaseResult
  increament seat no of currentCollege in collegeAvilableSeatsObject according to category
  decrement no of seats of allotedCollege category from collegeAvilableSeatsObject
  }else{do nothing}
  
  
  student Action
  -----------------------------
  
  -student can Freeze, Reject, Float
  
  ********if student freeze*******
  
  update seatStatus & currentCollege in studentList table
  add student with college to finalResult table
  remove student from meritStudentList
  
  *********if student reject*******
  
  update seatsStatus & currentCollege in studentList table
  increament seat no in avilableCollegeSeat according to category
  remove student from meritStudentList
  
  **********if student Float*******
  
  update seatStaus & currentCollege in meritStudentList table from secondPhaseResult? || firstPhaseResult
  
  **********if student do nothing*******
  
  it is equivalent to reject
  
  
  ---------------------------------------------------------------
  ---------------------------------------------------------------
  3nd phase Result Generation
  ---------------------------------------------------------------
  ---------------------------------------------------------------
  
  Step 1: loop through meritStudentList
  for each student
  {
  
  check college for generalRank & categoryRank using collegeAvilableSeatsObject
  allotedCollege = min(generalRankCollege, categoryRankCollege)
  
  if (allotedCollege < currentCollege)
  {store allotedcollege to secondPhaseResult
  increament seat no of currentCollege in collegeAvilableSeatsObject according to category
  decrement no of seats of allotedCollege category from collegeAvilableSeatsObject
  }else{do nothing}
  
  }
  
  student Action
  -----------------------------
  
  -student can Freeze, Reject
  
  ********if student freeze*******
  
  update seatStatus & currentCollege in studentList table
  add student with college to finalResult table
  remove student from meritStudentList
  
  *********if student reject*******
  
  update seatsStatus & currentCollege in studentList table
  increament seat no in avilableCollegeSeat according to category
  remove student from meritStudentList
  
  **********if student do nothing*******
  
  to be decided(reject or freeze)
  
  
  
  
  
  `;
