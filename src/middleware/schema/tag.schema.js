const Joi = require("joi");

const tagSchema = Joi.object({
  tag: Joi.string().min(1).required(),
  postId: Joi.string().required()
});

const updateTagSchema = Joi.object({
  tag: Joi.string().min(1).optional()
});

module.exports = {
  tagSchema,
  updateTagSchema
};