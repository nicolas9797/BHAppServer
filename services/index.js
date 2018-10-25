'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../conf/config')

function createToken(user){
	//payload son los datos que viajan entre cliente y servidor, hay
	//que tratar de evitar poner datos de más o que sean muy importantes
	const payload = {
		sub: user._id,//Se debe tratar que este id no sea el de mongo para no tener problemas de seguridad. Por ahora le ponemos, hay que cambiarlo
		iat: moment().unix(), //unix es el formato de la fecha
		exp: moment().add(2, 'days').unix() //indicamos que expira en 2 dias. 'years' tambien es posible.
	}

	return jwt.encode(payload, config.SECRET_TOKEN)

}

function decodeToken(token){
	const decoded = new Promise((resolve, reject) => {
		try{
			//Logica

			const payload = jwt.decode(token, config.SECRET_TOKEN)

			if(payload.exp < moment().unix()){ //Si el momento de expiración fue antes del momento actual
				reject({
					status: 401,
					message: 'El token expiró'
				})
			}

			resolve(payload.sub)

		}catch(err){
			reject({
				status: 500,
				message: 'Invalid Token'
			})
		}
	})

	return decoded
}

module.exports = {
	createToken,
	decodeToken
}