const Joi = require("@hapi/joi");

const createCollegeValidation = Joi.object({
  name: Joi.string().required(),
  general_seat: Joi.string().required(),
  obc_seats: Joi.string().required(),
  sc_seats: Joi.string().required(),
  st_seats: Joi.string().required(),
  pwd_seats: Joi.string().required(),
  ews_seats: Joi.string().required(),
});

const updateCollegeValidation = Joi.object({
  name: Joi.string(),
  general_seats: Joi.string(),
  obc_seats: Joi.string(),
  sc_seats: Joi.string(),
  st_seats: Joi.string(),
  pwd_seats: Joi.string(),
  ews_seats: Joi.string(),
});

module.exports = {
  createCollegeValidation,
  updateCollegeValidation,
};
