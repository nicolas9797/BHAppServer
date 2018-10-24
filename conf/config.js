module.exports = {

	//process.env es quien busca la variable de entorno en nuestra computadora

	port: process.env.PORT || 3000,
	db: process.env.MONGODB || 'mongodb://localhost:27017/firstInstanceMagnetar'

}