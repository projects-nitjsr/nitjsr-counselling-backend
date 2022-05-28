const Joi = require("@hapi/joi");

const createNoticeValidation = Joi.object({
  notice: Joi.string().min(50).required(),
});

module.exports = {
  createNoticeValidation,
};
