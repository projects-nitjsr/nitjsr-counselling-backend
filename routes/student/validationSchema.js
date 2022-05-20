const Joi = require("@hapi/joi");

const getStudentsByVerifyingCollegeValidation = Joi.object({
  email: Joi.string().email().required(),
});

const getStudentsByVerifingOfficerValidation = Joi.object({
  email: Joi.string().email().required(),
});

const updateStudentStatusValidation = Joi.object({
  applicationStatus: Joi.string().required(),
  failureDesc: Joi.string(),
  acceptedBy: Joi.string(),
  rejectedBy: Joi.string(),
  confirmationPending: Joi.string(),
  verifyingOfficer: Joi.string().required(),
  verifyingCollege: Joi.string().required(),
});

module.exports = {
  getStudentsByVerifyingCollegeValidation,
  getStudentsByVerifingOfficerValidation,
  updateStudentStatusValidation,
};
