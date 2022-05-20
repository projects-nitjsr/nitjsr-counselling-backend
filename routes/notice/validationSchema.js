const Joi = require("@hapi/joi");

const createNoticeValidation = Joi.object({
  notice: Joi.string().min(50).required(),
  user: Joi.string().required(),
});

module.exports = {
  createNoticeValidation,
};
