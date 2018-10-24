'use strict'

const express = require('express') //Pido el módulo express
const app = express(); //Guardo la instancia

//Usamos la función que se ejecuta por primera vez al iniciar el servidor.
//Requiere como primer parametro el puerto y como segundo dicha función.
app.listen(3000, () => {

	console.log("Corriendo en el puerto 3000")

})