const express = require('express');
const controllers = require('../controllers/main');
const postController = controllers.post
const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;