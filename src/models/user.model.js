const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [2, 'El nombre debe tener al menos 2 caracteres']
  }
}, { versionKey: false }); // Esto quita __v

const User = mongoose.model('User', userSchema);

module.exports = User;
