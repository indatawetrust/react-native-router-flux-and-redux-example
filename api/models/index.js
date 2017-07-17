const mongoose = require('mongoose')
const fs = require('fs')
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://mongo_api/glammy`, (err) => {
	if (err) {
		// logger
	}
})

try {

	const models = fs.readdirSync(__dirname).filter(model => model.match(/model/))

	for (let model of models) {
		exports[model.split('.')[0]] = require(`${__dirname}/${model}`)
	}

} catch(e ){

	// logger
	console.log(e)

}
