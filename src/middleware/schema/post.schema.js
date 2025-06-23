const Joi = require("joi");

// Validación de ObjectId válido
const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

const postSchema = Joi.object({
  description: Joi.string().min(5).max(500).required(),
  author: objectId.required(),
  comments: Joi.array().items(objectId).optional().default([]),
  images: Joi.array().items(objectId).optional().default([]),
  tags: Joi.array().items(objectId).optional().default([])
});

const updatePostSchema = Joi.object({
  description: Joi.string().min(5).max(500).optional(),
  comments: Joi.array().items(objectId).optional(),
  images: Joi.array().items(objectId).optional(),
  tags: Joi.array().items(objectId).optional()
}).min(1);

module.exports = {
  postSchema,
  updatePostSchema
};
