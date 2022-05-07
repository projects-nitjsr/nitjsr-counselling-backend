module.exports = {
  auth: {
    login: require("./auth/login"),
    logout: require("./auth/logout"),
    signup: require("./auth/signup"),
  },
  student: {
    getStudentByRegNo: require("./student/getStudentByRegNo"),
  },
  college: {
    getCollegeById: require("./college/getCollegeById"),
  },
};
