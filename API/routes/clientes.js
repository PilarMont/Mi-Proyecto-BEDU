/*const router = require('express').Router();
const {
  crearCliente,
  obtenerCliente,
  modificarCliente,
  eliminarCliente
} = require('../controllers/Clientes')

router.get('/', obtenerClientes)
router.post('/', crearClientes)
router.put('/:id', modificarClientes)
router.delete('/:id', eliminarClientes)

module.exports = router;*/

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
router.get('/:id', auth.requerido, obtenerCliente);
router.post('/', crearCliente)
router.post('/entrar', iniciarSesion)
router.put('/:id', auth.requerido, modificarCliente)
router.delete('/:id', auth.requerido, eliminarCliente)

module.exports = router;