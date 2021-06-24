var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('welcome to mi-proyecto-BEDU');
});

router.use('/clientes', require('./clientes'));
router.use('/productos', require('./productos'));


module.exports = router;
