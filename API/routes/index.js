var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('welcome to mi-proyecto-BEDU');
});

router.use('/clientes', require('./clientes'));
router.use('/mascotas', require('./mascotas'));
router.use('/solicitudes', require('./solicitudes'));
router.use('/desodorantes', require('./desodorantes'));


module.exports = router;
