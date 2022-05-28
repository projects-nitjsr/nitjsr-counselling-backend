const Joi = require("@hapi/joi");

const getstudentsbyverifingcollegeValidation = Joi.object({
  email: Joi.string().email().required(),
});

const getstudentsbyverifingofficerValidation = Joi.object({
  email: Joi.string().email().required(),
});

const studentActionValidation = Joi.object({
  regno: Joi.string().required(),
  studentAction: Joi.string().required(),
});

const updateStudentDataValidation = Joi.object({
  regno: Joi.string().required(),
  name: Joi.string(),
  email: Joi.string().email(),
  category: Joi.string(),
});

const updateStudentVerifyingCollegeValidation = Joi.object({
  verifyingCollegeWithRegNo: Joi.array().items(Joi.string()),
});

const updateStudentVerifyingOfficerValidation = Joi.object({
  regno: Joi.string().required(),
  verifyingOfficerEmail: Joi.string().email().required(),
});

const confirmDecisionValidation = Joi.object({
  regno: Joi.string().required(),
});

const denyDecisionValidation = Joi.object({
  regno: Joi.string().required(),
});

const rejectStudentValidation = Joi.object({
  regno: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(30).required(),
  categoryRejection: Joi.string().required(),
});
const verifyStudentValidation = Joi.object({
  regno: Joi.string().required(),
});

module.exports = {
  getstudentsbyverifingcollegeValidation,
  getstudentsbyverifingofficerValidation,
  studentActionValidation,
  updateStudentDataValidation,
  updateStudentVerifyingCollegeValidation,
  updateStudentVerifyingOfficerValidation,
  confirmDecisionValidation,
  denyDecisionValidation,
  rejectStudentValidation,
  verifyStudentValidation,
};
