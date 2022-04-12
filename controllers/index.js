module.exports = {
  auth: {
    login: require("./auth/login"),
    logout: require("./auth/logout"),
    signup: require("./auth/signup"),
  },
  user: {
    getUserByRegNo: require("./user/getUserByRegNo"),
  },
};
