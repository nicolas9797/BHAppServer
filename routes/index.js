'use strict'

const express = require('express')
const entradaController = require('../controllers/entrada')
const apiMagnetar = express.Router() //Nuestro manejador de rutas

apiMagnetar.get('/entradas', entradaController.getEntradas)
apiMagnetar.get('/entrada/:idEntrada', entradaController.getEntrada)
apiMagnetar.post('/entradas', entradaController.saveEntrada)
apiMagnetar.delete('/cancelarEntrada/:idEntrada', entradaController.deleteEntrada)
apiMagnetar.put('/modificarEntrada/:idEntrada', entradaController.updateEntrada)

module.exports = apiMagnetar