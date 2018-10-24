'use strict'

const express = require('express') //Pido el módulo express
const bodyParser = require('body-parser') //Pido el módulo bodyParser

const app = express() //Guardo la instancia
const port = process.env.PORT || 3000 //Obtengo el puerto por defecto, o uso el 3000

app.use(bodyParser.urlencoded({extended: false}))
//Esto es para evitar objetos anidados, como { person: { name: cw } 
//Esto se supera al usar json

app.use(bodyParser.json())
//Se usa de manera independiente a la instruccion anterior.
//Con esto le decimos al sistema que queremos usar json

//Metodo get de ejemplo
app.get('/metodoTest/:nombre', (req, res) => {
	res.send({ message: `Test correcto, bienvenido ${req.params.nombre}`})
})

app.get('/apiMagnetar/entradas', (req, res) => {
	res.send(200, {entradas: {}}) //Harcodeado
	//200 es el estado OK
})

app.get('/apiMagnetar/entradas/:idCliente', (req, res) => {

})

app.post('/apiMagnetar/entradas', (req, res) => {
	console.log(req.body) //No lo podemos ver normal, requerimos de Postman u otra herramiento
	res.send(200, {message: `Se recibio correctamente la información de la entrada`})
})

app.delete('/apiMagnetar/cancelarEntrada/:idEntrada', (req, res) => {

})


//Usamos la función que se ejecuta por primera vez al iniciar el servidor.
//Requiere como primer parametro el puerto y como segundo dicha función.
app.listen(port, () => {

	console.log(`Corriendo en el puerto: ${port}`)

})