const Joi = require("joi");

// Esquema para crear usuario
const userSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).required()
});

// Esquema para actualizar usuario (mínimo 1 campo)
const updateUserSchema = Joi.object({
  nickname: Joi.string().min(3).max(30)
}).min(1);

module.exports = {
  userSchema,
  updateUserSchema
};
