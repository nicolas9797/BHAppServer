'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../conf/config')

//Nuevamente, el next hace referencia a que siga haciendo otras cosas cuando lo usemos
function isAuth (req, res, next){

	if(!req.headers.authorization) //Si no tenemos un campo de autorizacion
		return res.status(403).send({message: 'No tienes autorizacion'})

	const token = req.headers.authorization.split(' ')[1] //El campo viene con una palabra clave, seguido de un espacio, seguido de un valor
	const payload = jwt.decode(token, config.SECRET_TOKEN)

	if(payload.exp < moment().unix()){ //Si el momento de expiración fue antes del momento actual
		return res.status(401).send({message: 'El token ha expirado'})
	}

	req.user = payload.sub
	next()

}

module.exports = isAuth