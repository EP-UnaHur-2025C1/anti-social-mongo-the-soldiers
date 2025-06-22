const Comments = require("../models/comment.model");

// Obtener todos los comentarios
const getComments = async (req, res) => {
    try {
        const comments = await Comments.find().select("comment creationDate userId postId visible _id");
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener comentarios de los últimos X meses
const getCommentsPerMonth = async (req, res) => {
    try {
        const defaultMonths = parseInt(process.env.MONTHS_COMMENTS) || 6;
        const monthsFilter = parseInt(req.query.months) || defaultMonths;

        const limitDate = new Date();
        limitDate.setMonth(limitDate.getMonth() - monthsFilter);

        const comments = await Comments.find({
            creationDate: { $gte: limitDate },
            visible: true
        }).select("comment creationDate -_id");

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un comentario por ID (la validez de ID ya la controla un middleware)
const getComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comments.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un comentario (validación previa vía middleware)
const createComment = async (req, res) => {
    try {
        const newComment = await Comments.create(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Editar un comentario (la validez de ID ya la controla un middleware)
const editComment = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedComment = await Comments.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un comentario (la validez de ID ya la controla un middleware)
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const commentDeleted = await Comments.findByIdAndDelete(id);

        if (!commentDeleted) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getComments,
    getCommentsPerMonth,
    getComment,
    createComment,
    editComment,
    deleteComment
};
