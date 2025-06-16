const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tag: {
    type: String, 
    required: [true, "The tag field is required"],
    unique: true,
    trim: true
  },
});

module.exports = mongoose.model('Tag', tagSchema);