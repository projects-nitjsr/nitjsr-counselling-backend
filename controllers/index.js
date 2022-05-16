module.exports = {
  auth: {
    login: require("./auth/login"),
    logout: require("./auth/logout"),
    signup: require("./auth/signup"),
  },
  student: {
    getStudentByRegNo: require("./student/getStudentByRegNo"),
    getStudents: require("./student/getStudents"),
    getStudentStatus: require("./student/getStudentStatus"),
    updateStudentStatus: require("./student/updateStudentStatus"),
    deleteStudent: require("./student/deleteStudent"),
  },
  college: {
    getCollegeById: require("./college/getCollegeById"),
    getCollegeList:  require("./college/getCollegeList"),
    updateCollegeById:  require("./college/updateCollegeById"),
    deleteCollegeById:  require("./college/deleteCollegeById"),
  },
  result: {
    getResult: require("./result/getResult"),
    getStudentResult: require("./result/getStudentResult"),
  },
};
