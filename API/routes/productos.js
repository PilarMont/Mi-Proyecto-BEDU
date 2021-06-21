//Aquí digoq ue me cargue el módulo de express y me cree un nuevo router
const router = require('express').Router(); //El router va a contener la infomación de las RUTAS

const {
    crearProducto,
    obtenerProducto,
    modificarProducto,
    eliminarProducto
  } = require('../controllers/desodorantes')
  var auth = require('./auth');

router.get('/', auth.opcional,obtenerProducto)
router.get('/:id', auth.opcional, obtenerProducto)// nuevo endpoint con todos los detalles de mascota
router.post('/', auth.requerido, crearProducto)
router.put('/:id',auth.requerido, modificarProducto)
router.delete('/:id',auth.requerido, eliminarProducto)

module.exports = router;