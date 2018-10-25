'use strict'

const Entrada = require('../models/entrada')

function getEntrada(req, res){

	let entradaId = req.params.entradaId

	//ent es nuestra entrada
	Entrada.findById(entradaId, (err, ent) =>{

		if(err) return res.status(500).send({message: `No se pudo realizar la petición ${err}`})

		//Si de alguna forma no nos llega la entrada
		if(!ent) return res.status(404).send({message: `No existe la entrada`})

		//Si en lugar de 'ent' se llamara 'entrada', la clave valor 'entrada: entrada' se podría escribir directamente como 'entrada'
		res.status(200).send({entrada: ent})

	})

}

function getEntradas(req, res){

	Entrada.find({}, (err, entradas) =>{

		if(err) return res.status(500).send({message: `Error en petición: ${err}`})

		if(!entradas) return res.status(404).send({message: `No existen productos`})

		res.send(200, {entradas}) //Harcodeado
		//200 es el estado OK

	})

}

function saveEntrada(req, res){

	console.log(req.body)

	let entrada = new Entrada()
	entrada.atencionEspecial = req.body.atencionEspecial
	entrada.canjeablePorPuntos = req.body.canjeablePorPuntos
	entrada.codEntrada = req.body.codEntrada
	entrada.especial = req.body.especial
	entrada.precio = req.body.precio
	entrada.reservada = req.body.reservada
	entrada.soloEnPuerta = req.body.soloEnPuerta
	entrada.vendida = req.body.vendida
	entrada.tipo = req.body.tipo

	//dos parametros: error e instancia salvada
	entrada.save((err, entradaStored) => {

		if (err) res.status(500).send({message:`Error al guardar: ${err}`})

		//Si no ocurre ningun error, entonces se guardó
		res.status(200).send({entrada: entradaStored})

	})

}

function deleteEntrada(req, res){

	let entradaId = req.params.idEntrada

	Entrada.findById(entradaId, (err) => {
		
		if(err) return console.log(`Error al conectar: ${err}`)

		entradaId.remove(err => {
			if(err) return console.log(`Error al remover: ${err}`)
			res.status(200).send({message: 'Se ha borrado la entrada'})
		})

	})

}

function updateEntrada(req, res){

	let entradaId = req.params.idEntrada
	let update = req.body

	Entrada.findByIdAndUpdate(entradaId, update, (err, entradaUpdated) =>{

		if(err) res.status(500).send({message: `Error al intentar actualizar: ${err}`})

		res.status(200).send({entrada: entradaUpdated})

	})

}

module.exports = {
	deleteEntrada,
	getEntrada,
	getEntradas,
	saveEntrada,
	updateEntrada
}