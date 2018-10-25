'use strict'

const auth = require('../middlewares/auth')
const express = require('express')
const entradaController = require('../controllers/entrada')
const apiMagnetar = express.Router() //Nuestro manejador de rutas

//El siguiente método es para probar que funciona la seguridad
apiMagnetar.get('/private', auth, function(req, res) { //Si pusieramos auth.isAuth tiraria error. Hay que revisarlo y testearlo
	res.status(200).send({message: 'Acceso permitido'})
})

apiMagnetar.get('/entradas', entradaController.getEntradas)
apiMagnetar.get('/entrada/:idEntrada', entradaController.getEntrada)
apiMagnetar.post('/entradas', entradaController.saveEntrada)
apiMagnetar.delete('/cancelarEntrada/:idEntrada', entradaController.deleteEntrada)
apiMagnetar.put('/modificarEntrada/:idEntrada', entradaController.updateEntrada)

module.exports = apiMagnetar