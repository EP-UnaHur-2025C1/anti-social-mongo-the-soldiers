const Router = require('express');
const controllers = require("../controllers/main");
const userController = controllers.user;
const router = Router()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router