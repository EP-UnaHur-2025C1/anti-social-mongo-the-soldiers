const express = require('express');
const controllers = require('../controllers/main');
const postController = controllers.post
const router = express.Router();

const { postValidation } = require('../middleware/main');

router.post('/', postValidation.validateCreatePost, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postValidation.validatePostId, postController.getPostById);
router.put('/:id', postValidation.validatePostId, postValidation.validateUpdatePost, postController.updatePost);
router.delete('/:id', postValidation.validatePostId, postController.deletePost);


module.exports = router;