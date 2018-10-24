'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entradaSchema = Schema({

	atencionEspecial: Boolean,
	canjeablePorPuntos: {type: Boolean, default: false},
	codEntrada: String,
	especial: Boolean,
	precio: {type: Number, default: 0},
	reservada: Boolean,
	soloEnPuerta: {type: Boolean, default: false},
	vendida: {type: Boolean, default: false},
	tipo: {type: String, enum:['VIP', 'SUPER VIP', 'COMUN', 'INVITADO']}

})

module.exports = mongoose.model('Entrada', entradaSchema)