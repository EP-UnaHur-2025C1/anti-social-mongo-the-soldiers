// routes/postRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Ruta para crear un nuevo post
router.post('/', postController.createPost);

// Ruta para obtener todos los posts
router.get('/', postController.getAllPosts);

// Ruta para obtener un post por ID
router.get('/:id', postController.getPostById);

// Ruta para actualizar un post por ID
router.put('/:id', postController.updatePost);

// Ruta para eliminar un post por ID
router.delete('/:id', postController.deletePost);

module.exports = router;