'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

//La idea es que no se guarde una clave de usuario, sino su hash
const UserSchema = new Schema({

	avatar: String,
	email: {type: String, unique: true, lowercase: true},
	lastLogin: Date,
	nameUser: String,
	pass: {type: String, select: false}, //select: false, sirve para no devolver al usuario esta información
	saldo: {type: Number, default: 0},
	signupDate: {type: Date, default: Date.now()}, //guardamos el dia en que ingresó
	usuarioPago: {type: Boolean, default: false}

})

//next sirve para referirnos a que siga avanzando con el siguiente middleware
//La función pre, nos permite que esto se ejecute antes de guardar el esquema de usaurio
UserSchema.pre('save', next => {
	let user = this
	if(!user.isModified('pass')) return next()

	bcrypt.genSalt(10, (err, salt) =>{

		if(err) return next(err)

		//Salt son los bits aleatorios para generar el hash
		bcrypt.hash(user.pass, salt, null, (err, hash) => {
			user.pass = hash
			next()
		})
	})
})

UserSchema.methods.gravatar = function () {

	if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}

module.exports = mongoose.model('usuario', UserSchema)