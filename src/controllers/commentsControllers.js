const Comments = require("../models/comments")

const getComments = async (req, res)=> {
    try {
        const comments = await Comments.find().select('comment creationDate -_id')
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getCommentsPerMonth = async (req, res) => {
    try {
        const defaultMonths = parseInt(process.env.MONTHS_COMMENTS) || 6;
        const monthsFilter = parseInt(req.query.months) || defaultMonths;

        const limitDate = new Date();
        limitDate.setMonth(limitDate.getMonth() - monthsFilter);

        const comments = await Comments.find({
            creationDate: { $gte: limitDate },
            visible: true
        }).select('comment creationDate -_id');

        const formattedComments = comments.map(comment => ({
            comment: comment.comment,
            date: comment.creationDate
        }));

        res.status(200).json(formattedComments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComment = async (req, res)=> {
    try {
        const id = req.params.id
        const comment = await Comments.findById(id)
        if(!comment) {
            return res.status(404).json({message: `comment not found`})
        }
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createComment = async (req, res)=> {
    try {
        const newComment = new Comments(req.body)
        await newComment.save()
        res.status(201).json(newComment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const editComment = async (req, res)=> {
    try {
        const updatedComment = await Comments.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedComment) {
            return res.status(404).json({ mensaje: 'comment not found' })
        }
        res.json({ mensaje: 'comment updated successfully', comment: updatedComment })
    } catch (error) {
        res.status(400).json({ mensaje: 'error updating comment', error })
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id
        const commentDeleted = await Comments.findByIdAndDelete(id)
        if (!commentDeleted) {
            return res.status(404).json({ mensaje: 'comment not found' })
        }
        res.json({ mensaje: 'comment successfully deleted', comment: commentDeleted })
    } catch (error) {
        res.status(500).json({ mensaje: 'error deleting comment', error })
    }
}

module.exports = {
    getComments,
    getCommentsPerMonth,
    getComment,
    createComment,
    editComment,
    deleteComment
}