const Joi = require("@hapi/joi");

const createVerifyingOfficerValidation = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

const deleteVerifyingOfficerValidation = Joi.object({
  email: Joi.string().email().required(),
});

const updateVerifyingOfficerValidation = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

module.exports = {
  createVerifyingOfficerValidation,
  deleteVerifyingOfficerValidation,
  updateVerifyingOfficerValidation,
};
