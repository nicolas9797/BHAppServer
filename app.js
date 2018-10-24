'use strict'

const express = require('express') //Pido el módulo express
const bodyParser = require('body-parser') //Pido el módulo bodyParser

const app = express() //Guardo la instancia

const api = require('./routes') // Como el archivo es un index, no hace falta aclararlo

app.use(bodyParser.urlencoded({extended: false}))
//Esto es para evitar objetos anidados, como { person: { name: cw } 
//Esto se supera al usar json

app.use(bodyParser.json())
//Se usa de manera independiente a la instruccion anterior.
//Con esto le decimos al sistema que queremos usar json

app.use('/apiMagnetar', api)

module.exports = app