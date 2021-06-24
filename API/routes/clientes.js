

const router = require('express').Router();
const {
  crearCliente,
  obtenerCliente,
  modificarCliente,
  eliminarCliente,
  iniciarSesion
} = require('../controllers/clientes')
const auth = require('./auth');

router.get('/', auth.opcional, obtenerCliente)
router.get('/:id', auth.opcional, obtenerCliente);
router.post('/', crearCliente)
router.post('/entrar', iniciarSesion)
router.put('/:id', auth.requerido, modificarCliente)
router.delete('/:id', auth.requerido, eliminarCliente)

module.exports = router;