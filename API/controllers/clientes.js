/*  Archivo controllers/clientes.js
 *  Simulando la respuesta de objetos clientes
 *  en un futuro aquí se utilizarán los modelos
 * Aquí pongo las funciones
 */
//HOLAAAA

// controllers/clinetes.js
const mongoose = require("mongoose")
const Cliente = mongoose.model("Cliente")
const passport = require('passport');

function crearCliente(req, res, next) {
  // Instanciaremos un nuevo clienres utilizando la clase cliente
  const body = req.body,
    password = body.password

  delete body.password
  const cliente = new Cliente(body)
  cliente.crearPassword(password)
  cliente.save().then(user => {                                         //Guardando nuevo usuario en MongoDB.
    return res.status(201).json(user.toAuthJSON())
  }).catch(next)
}

function obtenerCliente(req, res, next) {                              //Obteniendo usuario desde MongoDB.
  if(req.params.id){
    Cliente.findById(req.params.id, (err, user) => {
      if (!user || err) {
        return res.sendStatus(401)
      }
      return res.json(user.publicData());
    }).catch(next);
  } else {
    Cliente.find().then(clientes=>{
      clientes = clientes.map(u => u.publicData())
      res.send(clientes)
    }).catch(next)
  }
}

function modificarCliente(req, res, next) {
  console.log(req.cliente)
  Cliente.findById(req.cliente.id).then(user => {
    if (!user) { return res.sendStatus(401); }
    let nuevaInfo = req.body
    if (typeof nuevaInfo.username !== 'undefined')
      user.username = nuevaInfo.username
    if (typeof nuevaInfo.ubicacion !== 'undefined')
      user.ubicacion = nuevaInfo.ubicacion
    if (typeof nuevaInfo.telefono !== 'undefined')
      user.telefono = nuevaInfo.telefono
    if (typeof nuevaInfo.password !== 'undefined')
      user.crearPassword(nuevaInfo.password)
    user.save().then(updatedUser => {                                   //Guardando usuario modificado en MongoDB.
      res.status(201).json(updatedUser.publicData())
    }).catch(next)
  }).catch(next)
}

function eliminarCliente(req, res) {
  // únicamente borra a su propio usuario obteniendo el id del token
  Cliente.findOneAndDelete({ _id: req.cliente.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Cliente ${req.params.id} eliminado: ${r}`);
  })
}

function iniciarSesion(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "no puede estar vacío" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "no puede estar vacío" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generarJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
}

module.exports = {
  crearCliente,
  obtenerCliente,
  modificarCliente,
  eliminarCliente,
  iniciarSesion
}