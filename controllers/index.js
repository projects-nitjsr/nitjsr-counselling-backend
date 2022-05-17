module.exports = {
  auth: {
    adminLogin: require("./auth/admin/login"),
    studentLogin: require("./auth/login"),
  },
  student: {
    getStudentByRegNo: require("./student/getStudentByRegNo"),
  },
  college: {
    getCollegeById: require("./college/getCollegeById"),
  },
};
