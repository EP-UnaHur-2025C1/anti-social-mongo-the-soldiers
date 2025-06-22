const Joi = require("joi");

// Esquema para crear archive
const archiveSchema = Joi.object({
  imagenes: Joi.string().required()
});

// Esquema para actualizar archive (mínimo 1 campo)
const updateArchiveSchema = Joi.object({
  imagenes: Joi.string()
}).min(1);

module.exports = {
  archiveSchema,
  updateArchiveSchema
};
