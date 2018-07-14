//"use strict";
const Rejson = require('../fun/rejson')
//var myout = {}
module.exports = () => {
	Rejson.myget('network').then((myout) => {
		Object.entries(myout).forEach(([key, value]) => console.log(value))
	})
}

//rejson.close()
