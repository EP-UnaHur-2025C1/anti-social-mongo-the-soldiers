
const Router = require('express');
const controllers = require("../controllers/main");
const userController = controllers.user;
const router = Router()

router.get('/', userController.obtenerUsers)
router.get('/:id', userController.obtenerUser)
router.post('/', userController.crearUser)
router.put('/:id', userController.editarUser)
router.delete('/:id', userController.eliminarUser)

module.exports = router