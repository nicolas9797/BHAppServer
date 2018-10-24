'use strict'

//Primero debe estar corriendo la base de datos antes que el servidor, para evitar conflictos
//Mongoose nos sirve para usar mongo en node
const mongoose = require('mongoose') //Pido el módulo mongoose

const app = require('./app')

const config = require('./conf/config')

/*	
	Le pasamos la dirección donde esta corriendo la base de datos, la siguiente
	es la de desarrollo
	Como es en localhost no hace falta, pero lo pongo para que se vea completo
	El nombre firstInstanceMagnetar es el nombre de la base
*/
mongoose.connect(config.db, (err, res) => {

	//if(err) throw err

	if(err)
		console.log(`Error al conectar a la BD: ${err}`)

	console.log('Conexion establecida')

	//Usamos la función que se ejecuta por primera vez al iniciar el servidor.
	//Requiere como primer parametro el puerto y como segundo dicha función.
	app.listen(config.port, () => {

		//Notese que esto esta dentro de mongoose, porque queremos que asegure primero
		//la conexion a la base de datos

		console.log(`Corriendo en el puerto: ${config.port}`)

	})

})