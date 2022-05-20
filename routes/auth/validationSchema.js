const Joi = require("@hapi/joi");

const adminLoginValidation = Joi.object({
  regno: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
  designation: Joi.string().required(),
});
//reset password validation can be used for both student and admin
const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});
//forgot password validation can be used for both student and admin
const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});

const studentLoginValidation = Joi.object({
  regno: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

const studentSignupValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

const verifyStudentValidation = Joi.object({
  regNo: Joi.string().required(),
});

module.exports = {
  adminLoginValidation,
  resetPasswordValidation,
  forgotPasswordValidation,
  studentLoginValidation,
  studentSignupValidation,
  verifyStudentValidation,
};
