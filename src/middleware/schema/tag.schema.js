const Joi = require("joi");

const tagSchema = Joi.object({
  tag: Joi.string().min(1).required()
});

const tagUpdateSchema = Joi.object({
  tag: Joi.string().min(1).optional()
});

module.exports = {
  tagSchema,
  tagUpdateSchema
};