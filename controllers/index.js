module.exports = {
  auth: {
    adminLogin: require("./auth/admin/login"),
    studentLogin: require("./auth/login"),
    adminForgotPassword: require("./auth/admin/forgotPassword"),
    adminResetPassword: require("./auth/admin/resetPassword"),
  },
  student: {
    getStudentByRegNo: require("./student/getStudentByRegNo"),
  },
  college: {
    getCollegeById: require("./college/getCollegeById"),
  },
};
