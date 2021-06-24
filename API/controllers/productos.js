/*  Archivo controllers/desodorantes.js Aquí es donde debo declarar las funciones 
 *  Simulando la respuesta de objetos Desodorantes
 *  en un futuro aquí se utilizarán los modelos
 */

const mongoose = require('mongoose')
const Producto = mongoose.model('Producto')

function crearProducto(req, res, next) {
  var producto = new Producto(req.body)
    producto.save().then(producto => {
    res.status(201).send(producto)
  }).catch(next)
}

function obtenerProducto(req, res, next) {
  if(req.params.id){
    Producto.findById(req.params.id)
			.populate('producto', 'categoria foto descripcion precio').then(producto => {
	      res.send(producto)
	    }).catch(next)
  } else {
    Producto.find().then(producto=>{
      res.send(producto)
    }).catch(next)
  }
}

function modificarProducto(req, res, next) {
  console.log(req.product)
  Producto.findById(req.params.id).then(product => {
    if (!product) { return res.sendStatus(401); }
    let nuevaInfo = req.body
    if (typeof nuevaInfo.producto !== 'undefined')
    product.producto = nuevaInfo.producto
    if (typeof nuevaInfo.categoria !== 'undefined')
    product.categoria = nuevaInfo.categoria
    if (typeof nuevaInfo.foto !== 'undefined')
    product.foto = nuevaInfo.foto
    if (typeof nuevaInfo.descripcion !== 'undefined')
    product.descripcion = nuevaInfo.descripcion
    product.save().then(updatedProduct => {                                   //Guardando usuario modificado en MongoDB.
      res.status(201).json(updatedProduct.publicData())
    }).catch(next)
  }).catch(next)
}

function eliminarProducto(req, res) {
  // únicamente borra a su propio producto obteniendo el id del token
  Producto.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando producto en MongoDB.
    res.status(200).send(`Producto ${req.params.id} eliminado: ${r}`);
  })

}

  module.exports = {
    crearProducto,
    obtenerProducto,
    modificarProducto,
    eliminarProducto,
  }

  
