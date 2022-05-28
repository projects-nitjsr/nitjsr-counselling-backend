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
  verifyingOfficeremail: Joi.string().email().required(),
});

const updateVerifyingOfficerValidation = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});
const getVerifyingOfficerByEmail = Joi.object({
  email: Joi.string().email().required(),
});
module.exports = {
  createVerifyingOfficerValidation,
  deleteVerifyingOfficerValidation,
  updateVerifyingOfficerValidation,
  getVerifyingOfficerByEmail,
};
