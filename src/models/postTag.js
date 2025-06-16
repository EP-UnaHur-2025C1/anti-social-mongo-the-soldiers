const mongoose = require("mongoose");

const postTagSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    tagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    }
});

module.exports = mongoose.model("PostTag", postTagSchema);
