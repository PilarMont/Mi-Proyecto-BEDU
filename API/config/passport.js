const passport = require('passport');                       //Importando passport, middleware para autenticación.
const LocalStrategy = require('passport-local').Strategy;   //Importando estrategia autenticación. --> passport-local
const mongoose = require('mongoose');
const cliente = mongoose.model('Cliente');

passport.use(new LocalStrategy({                            //Configurando elementos utilizados para habilitar sesión.
    usernameField: 'email',             //LocalStrategy inspecciona los campos username y password de las peticiones que vienen del frontend
    passwordField: 'password'
}, function (email, password, done) {
    cliente.findOne({ email: email }).then(function (user) {
    if (!user || !user.validarPassword(password)) {
        return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
    }
        return done(null, user);
    }).catch(done);
}));