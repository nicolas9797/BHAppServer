'use strict'

const services = require('../services')

//Nuevamente, el next hace referencia a que siga haciendo otras cosas cuando lo usemos
function isAuth (req, res, next){

	if(!req.headers.authorization) //Si no tenemos un campo de autorizacion
		return res.status(403).send({message: 'No tienes autorizacion'})

	const token = req.headers.authorization.split(' ')[1] //El campo viene con una palabra clave, seguido de un espacio, seguido de un valor
	
	services.decodeToken(token)
		.then(response => {
			req.user = response
			next()
		})
		.catch(response => {
			res.status(response.status)
		})

}

module.exports = isAuth