const Router = require("express")
const controllers = require("../controllers/main");
const tagControllers= controllers.tag

const tagMiddleware = require("../middleware/tag.middleware")

const router = Router()

router.get(`/`, tagControllers.getTags)
router.get(`/:id`, tagMiddleware.validateTagId, tagControllers.getTag)
router.post(`/`, tagMiddleware.validateCreateTag, tagControllers.createTag)
router.put(`/:id`, tagMiddleware.validateTagId, tagMiddleware.validateUpdateTag, tagControllers.editTag)
router.delete(`/:id`, tagMiddleware.validateTagId, tagControllers.deleteTag)

module.exports = router