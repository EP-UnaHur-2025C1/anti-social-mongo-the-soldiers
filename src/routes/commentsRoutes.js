const {Router} = require("express")
const commentsControllers = require("../controllers/commentsControllers")
const commentMiddleware = require("../middleware/comments.middleware")
const router = Router()

router.get(`/`, commentsControllers.getComments)
router.get(`/perMonth`, commentsControllers.getCommentsPerMonth)
router.get(`/:id`, commentMiddleware.validateCommentId, commentsControllers.getComment)
router.post(`/`, commentMiddleware.validateCreateComment, commentsControllers.createComment)
router.put(`/:id`, commentMiddleware.validateCommentId, commentMiddleware.validateUpdateComment, commentsControllers.editComment)
router.delete(`/:id`, commentMiddleware.validateCommentId, commentsControllers.deleteComment)

module.exports = router