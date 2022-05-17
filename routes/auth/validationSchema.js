const Joi = require("@hapi/joi");

const adminLoginValidation = Joi.object({
  regno: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
  designation: Joi.string().required(),
});

const adminResetPasswordValidation = Joi.object({
  regno: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});

const studentLoginValidation = Joi.object({
  regno: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

module.exports = {
  adminLoginValidation,
  adminResetPasswordValidation,
  forgotPasswordValidation,
  studentLoginValidation,
};
