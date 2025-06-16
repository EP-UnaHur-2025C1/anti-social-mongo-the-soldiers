// models/Post.js

const mongoose = require('mongoose');

// Creamos el esquema del post
const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true, // La descripción es obligatoria
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencia al modelo User
      required: true
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image' // Referencia a imágenes asociadas al post
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag' // Referencia a etiquetas (tags)
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' // Referencia a comentarios
      }
    ]
  },
  {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
  }
);

// Exportamos el modelo
module.exports = mongoose.model('Post', postSchema);