'use strict'

//Lo siguiente es para la atenticación

const mongoose = require('mongoose')
const User = require('..models/usuario')
const service = require('../services')

//La idea es que el JWT se guarde en el local storage, y se hagan verificaciones
//tanto al salir como al entrar
function signUp (req, res){
	const user = new User({

		email: req.body.email,
		nameUser: req.body.nameUser

	})

	user.save((err) => {
		
		if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
	
		return res.status(200).send({token: service.createToken(user)})

	})
}

function signIn (req, res){

	User.find({email: req.body.email}, (err, user) => {

		if (err) return res.status(500).send({message: 'Error en el inicio de sesión: ' + err})
		if (!user) return res.status(404).send({message: 'No existe el usuario'})

		req.user = user
		res.status(200).send({
			message: 'Logueo correcto',
			token: service.createToken(user)
		})


	})

}

module.exports = {

	signUp,
	signIn

}