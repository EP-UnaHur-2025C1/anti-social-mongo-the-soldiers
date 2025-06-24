const Comments = require("../models/comment.model");
const Post = require('../models/post.model');

const getComments = async (req, res) => {
    try {
        const comments = await Comments.find().select("comment creationDate userId postId visible _id");
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


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

const createComment = async (req, res) => {
  try {
    const { comment, userId, postId } = req.body;

    const newComment = await Comments.create({
      comment,
      userId,
      postId
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id }
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ message: 'Error al crear comentario.' });
  }
};

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

