'use strict';

const allocate = (seatMatrix, waitingseatMatrix, meritList, preferenceList, collegeList) => {
    modifiedMeritList = sortMeritListByRank(meritList); 
   
    for(let student of meritList){
        var studentId = student.studentId
        var category = student.category
        if(student.withdrawn===false && student.seatFroze===false)
        {

        for(let preferedClgId of preferenceList[studentId].clgIdList)
        {
          if(seatMatrix[preferedClgId].seatByCategory[category].studentIdList.length < 
            collegeList[preferedClgId].categoryCount[category] && student.chosenClgId === NULL )
            {
              seatMatrix[preferedClgId].seatByCategory[category].studentIdList.push(studentId)
              // TODO: function to call API to store the preferedClgId value in chosenClgId field in the MeritList 
                // table of the student
              meritList = getMeritList()   // Function used to make the Api Call to fetch the MeritList 
              break;
            }

            
          // Seat Already Allocated
          else if(seatMatrix[preferedClgId].seatByCategory[category].studentIdList.length < 
            collegeList[preferedClgId].categoryCount[category] && student.chosenClgId !== NULL ) 
            {
              withdrawn_seat(studentId, meritList, seatMatrix)  // To Withdraw Previously Allocated Seat
              seatMatrix[preferedClgId].seatByCategory[category].studentIdList.push(studentId)
              // TODO: function to call API to store the preferedClgId value in chosenClgId field in the MeritList 
                // table of the student
              meritList = getMeritList()   // Function used to make the Api Call to fetch the MeritList 
              break;

            }
            // else
            // {
            //    waitingseatMatrix[preferedClgId].seatByCategory[category].studentIdList.push(studentId)
            // }
        }
        }
     }
   
     // TODO: function to call API to store the new seatMatrix and waitingseatMatrix
 

};

module.exports = allocate;
