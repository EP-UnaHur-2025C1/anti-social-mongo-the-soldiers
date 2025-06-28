const mongoose = require("mongoose");
const { comentSchema } = require("./schema/comments.schema");

const validateCommentId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid comment ID." });
    }

    next();
};
const validateCreateComment = (req, res, next) => {
    const { error } = comentSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { postId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    next();
};
const validateUpdateComment = (req, res, next) => {
    const { error } = comentSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = {
    validateCommentId,
    validateCreateComment,
    validateUpdateComment
};
