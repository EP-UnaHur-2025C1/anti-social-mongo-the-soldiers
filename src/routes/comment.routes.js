const {Router} = require("express")
const controllers = require("../controllers/main")
const commentControllers= controllers.comment

const commentMiddleware = require("../middleware/comments.middleware")

const router = Router()

router.get(`/`, commentControllers.getComments)
router.get(`/perMonth`, commentControllers.getCommentsPerMonth)
router.get(`/:id`, commentMiddleware.validateCommentId, commentControllers.getComment)
router.post(`/`, commentMiddleware.validateCreateComment, commentControllers.createComment)
router.put(`/:id`, commentMiddleware.validateCommentId, commentMiddleware.validateUpdateComment, commentControllers.editComment)
router.delete(`/:id`, commentMiddleware.validateCommentId, commentControllers.deleteComment)

module.exports = router