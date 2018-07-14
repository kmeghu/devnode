//"use strict";
const Testjson = require('../bin/tt')
var myout = {}
module.exports = async () => {
	try {
		myout = await Testjson()
		console.dir(await myout)
	} catch (err) {
		console.log(err)
	}
	
}

//rejson.close()
