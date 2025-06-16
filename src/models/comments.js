const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  comment: {
    type: String, 
    required: [true, "The comment field is required"],
    maxlength: [200, "The comment cannot exceed 200 characters."]
  },
  creationDate: {
    type: Date, 
    default: Date.now
  },
  visible: {
    type: Boolean, 
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true
  }
});

module.exports = mongoose.model('Comments', commentsSchema);