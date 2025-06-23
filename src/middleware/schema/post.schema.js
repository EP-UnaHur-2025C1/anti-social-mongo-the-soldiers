const Joi = require("joi");

// Validador de ObjectId como string de 24 hexadecimales
const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

// Esquema para crear un post
const postSchema = Joi.object({
  description: Joi.string().min(5).max(500).required(),
  author: objectId.required(),
  comments: Joi.array().items(objectId),
  images: Joi.array().items(objectId),
  tags: Joi.array().items(objectId)
});

// Esquema para actualizar un post (mínimo 1 campo)
const updatePostSchema = Joi.object({
  description: Joi.string().min(5).max(500),
  comments: Joi.array().items(objectId),
  images: Joi.array().items(objectId),
  tags: Joi.array().items(objectId)
}).min(1);

module.exports = {
  postSchema,
  updatePostSchema
};
