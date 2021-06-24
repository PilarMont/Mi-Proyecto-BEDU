const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  producto: {type: String, required: true}, // nombre del producto 
  categoria: { type: String, enum: ['desodorante', 'jabón', 'shampoo', 'acondicionador', 'cepillo de dientes', 'ecobolsa'] }, 
  foto: [String], // links a las fotografías
  descripcion: {type:String, required: true},
  precio: {type:Number, required: true},// descripción del producto
}, 
{ timestamps: true }
);


productoSchema.methods.publicData = function(){
  return {
    id: this.id,
    producto: this.producto,
    categoria: this.categoria,
    foto: this.foto,
    descripcion: this.descripcion,
    precio: this.precio,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Producto', productoSchema) //Define el modelo producto, utilizando el esquema ProductoSchema.

 