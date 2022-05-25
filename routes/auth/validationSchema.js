const Joi = require("@hapi/joi");

const adminLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

const adminResetPasswordValidation = Joi.object({
  regno: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
  token: Joi.string().required(),
});
<<<<<<< HEAD

=======
//forgot password validation for student
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
const forgotPasswordValidation = Joi.object({
  regno: Joi.string().required(),
});

//forgot password validation for admin
const forgotPasswordValidationAdmin = Joi.object({
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
<<<<<<< HEAD
=======
  studentSignupValidation,
  verifyStudentValidation,
  forgotPasswordValidationAdmin,
>>>>>>> 7137a31f7564407111c8fd1a00aa4b30077ba94b
};
