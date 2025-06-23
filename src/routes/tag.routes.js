const Router = require("express")
const controllers = require("../controllers/main");
const tagControllers = controllers.tag

const {tagValidation} = require("../middleware/main");


const router = Router()

router.get(`/`, tagControllers.getTags)
router.get(`/:id`, tagValidation.validateTagId, tagControllers.getTag)
router.post(`/`, tagValidation.validateCreateTag, tagControllers.createTag)
router.put(`/:id`, tagValidation.validateTagId, tagValidation.validateUpdateTag, tagControllers.editTag)
router.delete(`/:id`, tagValidation.validateTagId, tagControllers.deleteTag)


module.exports = router