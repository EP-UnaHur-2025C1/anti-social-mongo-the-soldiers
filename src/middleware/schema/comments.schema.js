const Joi = require("joi");

const comentSchema = Joi.object({
    postId: Joi.string().required(),
    userId: Joi.string().required(),
    comment: Joi.string().min(1).max(200).required(),
    creationDate: Joi.date().optional(),
    visible: Joi.boolean().optional()
});

module.exports = { comentSchema };