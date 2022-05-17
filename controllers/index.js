module.exports = {
  auth: {
    adminLogin: require("./auth/admin/login"),
    studentLogin: require("./auth/student/login"),
    adminForgotPassword: require("./auth/admin/forgotPassword"),
    adminResetPassword: require("./auth/admin/resetPassword"),
    studentForgotPassword: require("./auth/student/forgotPassword"),
    studentResetPassword: require("./auth/student/resetPassword"),
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
  admin: {
    createCenterIncharge: require("./admin/createCenterIncharge"),
    deleteCenterIncharge: require("./admin/deleteCenterIncharge"),
    getCenterIncharge: require("./admin/getCenterIncharge"),
    updateCenterIncharge: require("./admin/updateCenterIncharge"),
    getLogs : require("./admin/getLogs"),
    getAdminLogs : require("./admin/getAdminLogs"),
  },
  result: {
    getResult: require("./result/getResult"),
    getStudentResult: require("./result/getStudentResult"),
  },
};
