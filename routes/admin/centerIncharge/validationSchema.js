const Joi = require("@hapi/joi");

const createCenterInchargeValidation = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  college: Joi.string().required(),
  collegeEmail: Joi.string().required().email(),
});

const deleteCenterInchargeValidation = Joi.object({
  email: Joi.string().required().email(),
});

const updateCenterInchargeValidation = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  phone: Joi.string(),
  collegeEmail: Joi.string().email(),
});

module.exports = {
  createCenterInchargeValidation,
  deleteCenterInchargeValidation,
  updateCenterInchargeValidation,
};
