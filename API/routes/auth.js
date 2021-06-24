// Archivo que se crea para configurar autorizaciones sobre los distintos endpoints de nuestro proyectp 

const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
      return null;
}

const auth = {
    requerido: jwt({   //El middleware requerido se utilizará para endpoints donde se requiera tener una sesión y opcional donde no sean necesarios.
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        getToken: getTokenFromHeader  //La función getTokenFromHeader() es una función que utlizarán los dos middlewares para extraer el token del header de Authorization de una petición http.
    }),
    opcional: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',   //La propiedad userProperty es donde vendrá el JWT descifrado y que podrémos utilizar después en el objeto request por medio de req.usuario
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};

module.exports = auth;