'use strict';

const withdrawn = (studentId, meritList, seatMatrix) => {
  // TODO: call the API to update meritList[studentId].withDrawn = true;
 let modifiedMeritList = sortMeritListByStudentId(meritList)
 let chosenClgId = modifiedMeritList[studentId].chosenClgId
 let category = modifiedMeritList[studentId].category
 let seatList = seatMatrix[chosenClgId].seatByCategory[category]
 const newSeatList = seatList.filter( seatList => seatList !== studentId);
 // TODO: call the API to update the seatList by newSeatList

}

module.exports = withdrawn;