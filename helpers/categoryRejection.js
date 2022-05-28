const db = require("./dbconnect");




module.exports=async()=>{
    const studentStatus = await db.queryAsync(
    "SELECT * FROM student_status WHERE categoryRejection=true"
  );
    
  let query = "SET autocommit=0;START TRANSACTION;";

  studentStatus.forEach(async function (item) {
    query += mysql.format(
      "UPDATE student SET category = NULL,categoryRank=NULL WHERE regno = ?; ",
      [item.regno]
    );
    if (item.seatAllotmentCategory) {
        const student = await db.queryAsync(
            "SELECT * FROM student WHERE regno=?",
            [item.regno]

        )
        const collegeId=student[0].prefernces[student[0].currentSeatIndex]
        const category=student[0].seatAllotmentCategory
        const noOfSeats = await db.queryAsync(
            `SELECT ${category}_seats FROM colleges WHERE id=?`,
            [collegeId]
        )
      query += mysql.format(
        `UPDATE student SET currentSeatIndex = NULL WHERE regno = ?; 
         UPDATE student_status SET categoryRejection=false WHERE regno=?;
         UPDATE colleges SET ${category}_seats=? WHERE id=?`,

        [item.regno,item.regno,noOfSeats[0][`${category}_seats`]+1,collegeId]
      );

    }
  });

  query += "COMMIT;SET autocommit=1;";

  db.query(query);

}