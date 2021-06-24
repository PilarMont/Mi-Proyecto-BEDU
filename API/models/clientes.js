

   const mongoose = require('mongoose');                         //Importando mongoose.
   const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.
   const crypto = require('crypto');                             //Importando módulo crypto, pendiente de instalar.
   const jwt = require('jsonwebtoken');                          //Importando módulo jsonwebtoken, pendiente de instalar.
   const secret = require('../config').secret;                   

   const ClienteSchema = new mongoose.Schema({                   //Definiendo el objeto ClienteSchema con el constructor Schema.
    username: {                                                  //Definiendo cada campo con sus tipo sde datos y validaciones.
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/^[a-zA-Z0-9]+$/, "es inválido"],
      index: true,
    },                                           
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/\S+@\S+\.\S+/, "es inválido"],
      index: true,  //La opción {index: true} optimizará los queries para el campo username e email.
    },
    ubicacion: String,
    telefono: String,
    hash: String, //este campo se utilizará para la sesión
    salt: String, //este campo se utilizará para la sesión
  },
  { timestamps: true } //Agrega automáticamente la hora y fecha de la creación
); 

// usando plugin de validación para que no se repitan correos ni usernames
ClienteSchema.plugin(uniqueValidator, { message: "Ya existe" });

ClienteSchema.methods.crearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex"); // generando una "sal" random para cada cliente
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"); // generando un hash utilizando la sal
};

/**
 * Recibe el password, genera y compara el has con el de la base de datos
 */
ClienteSchema.methods.validarPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

ClienteSchema.methods.generarJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60); // 60 días antes de expirar

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

/**
 * Devuelve la representación de un usuario después de autenticar
 */
ClienteSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generarJWT()
  };
};

/**
* Devuelve la representación de un usuario, sólo datos públicos
*/
ClienteSchema.methods.publicData = function(){
  return {
    id: this.id,
    username: this.username,
    email: this.email,
    nombre: this.nombre,
    apellido: this.apellido, 
    ubicacion: this.ubicacion,
    telefono: this.telefono,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model("Cliente", ClienteSchema);    //Define el modelo Cliente, utilizando el esquema ClienteSchema.