Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
  }

function sortMeritListByRank(meritList) {
  return newMeritList = meritList.sortBy('rank');
}
 

function sortMeritListByCategory(meritList) {
  return newMeritList = meritList.sortBy('category');
}


function sortMeritListByStudentId(meritList) {
  return newMeritList = meritList.sortBy('studentId');
}