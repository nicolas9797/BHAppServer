'use strict'

const express = require('express') //Pido el módulo express
const bodyParser = require('body-parser') //Pido el módulo bodyParser

const entradaController = require('./controllers/entrada')

const app = express() //Guardo la instancia

app.use(bodyParser.urlencoded({extended: false}))
//Esto es para evitar objetos anidados, como { person: { name: cw } 
//Esto se supera al usar json

app.use(bodyParser.json())
//Se usa de manera independiente a la instruccion anterior.
//Con esto le decimos al sistema que queremos usar json

app.get('/apiMagnetar/entradas', entradaController.getEntradas)
app.get('/apiMagnetar/entrada/:idEntrada', entradaController.getEntrada)
app.post('/apiMagnetar/entradas', entradaController.saveEntrada)
app.delete('/apiMagnetar/cancelarEntrada/:idEntrada', entradaController.deleteEntrada)
app.put('/apiMagnetar/modificarEntrada/:idEntrada', entradaController.updateEntrada)

module.exports = app