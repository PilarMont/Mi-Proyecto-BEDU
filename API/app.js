/*********************** COMENTAR EN PRODUCTIVO *******************************/
require('dotenv').config(); // Configuring dotenv -> Para instalar -> npm i -D dotenv Solo lo voy a correr si no estpy en producción
/*********************** COMENTAR EN PRODUCTIVO *******************************/

var express = require('express'),
    cors = require('cors');
// Objeto global de la app
var app = express();

// configuración de middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*********************** Mongoose Configuration *******************************/
const mongoose = require("mongoose");

var isProduction = process.env.NODE_ENV === 'production';

console.log(process.env.MONGODB_URI, " ", process.env.NODE_ENV);

mongoose.connect(
  process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

/*mongoose.connect(
  "mongodb+srv://<usuario>:<password>@cluster0-xmea4.mongodb.net/<dbname>?retryWrites=true&w=majority"
);*/

//mongoose.set("debug", true);

const errorhandler = require('errorhandler')
    if (!isProduction) {
      mongoose.set('debug', true)
      app.use(errorhandler()) // solo usar errorHandler si no estoy en producción
      // imprimirá los errores en development
      app.use(function (err, req, res, next) { // esto es un middleware, una función que recibe 4 parámetros un error, una petición porla que se da el error, una respuesta y un next que dice que pase al siguiente middleware, si no llamo a next estonces se dentiene en ese middleware
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({
          'errors': {
            message: err.message,
            error: err
          }
        })
      })
    }
    
// Aquí se importarán los modelos de clientes y productos cuando estén listos
require('./models/Cliente');
require('./config/passport');
require('./models/productos');



/*********************** Mongoose Configuration *******************************/

// Agregamos el código de nuestro router (routes/index.js)
app.use('/v1', require('./routes'));

// Manejando los errores 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Iniciando el servidor...
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Escuchando en el puerto ' + server.address().port);
});