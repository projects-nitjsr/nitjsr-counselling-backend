const Joi = require("@hapi/joi");

const getStudentsByVerifyingCollegeValidation = Joi.object({
  email: Joi.string().email().required(),
});

const getStudentsByVerifingOfficerValidation = Joi.object({
  email: Joi.string().email().required(),
});

const updateStudentVerifyingCollegeValidation = Joi.object({
  regNo: Joi.string().required(),
  verifyingCollegeWithRegNo: Joi.array().required,
});

const updateStudentVerifyingOfficerValidation = Joi.object({
  regNo: Joi.string().required(),
  verifyingOfficer: Joi.string().email().required(),
});

module.exports = {
  getStudentsByVerifyingCollegeValidation,
  getStudentsByVerifingOfficerValidation,
  updateStudentVerifyingCollegeValidation,
  updateStudentVerifyingOfficerValidation,
};
