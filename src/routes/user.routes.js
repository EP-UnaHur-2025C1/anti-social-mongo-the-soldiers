const Router = require('express');
const controllers = require("../controllers/main");
const userController = controllers.user;
const { userValidation } = require("../middleware/main");
const router = Router()

router.get('/', userController.getUsers)
router.get('/:id', userValidation.validateUserId, userController.getUser)
router.post('/', userValidation.validateCreateUser, userController.createUser)
router.put('/:id', userValidation.validateUpdateUser, userValidation.validateUpdateUser, userController.updateUser)
router.delete('/:id', userValidation.validateUserId, userController.deleteUser)


module.exports = router