const {Router} = require("express")
const tagControllers = require("../controllers/tagControllers")
const tagMiddleware = require("../middleware/tag.middleware")
const router = Router()

router.get(`/`, tagControllers.getTags)
router.get(`/:id`, tagMiddleware.validateTagId, tagControllers.getTag)
router.post(`/`, tagMiddleware.validateCreateTag, tagControllers.createTag)
router.put(`/:id`, tagMiddleware.validateTagId, tagMiddleware.validateUpdateTag, tagControllers.editTag)
router.delete(`/:id`, tagMiddleware.validateTagId, tagControllers.deleteTag)

module.exports = router