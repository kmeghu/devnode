"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
const Rejson = require('../fun/rejson')


module.exports = async (args) => {
	try {
		var myvalue = {}
		let mylength = 0
		if (args._[2]) {
			myvalue = await Rejson.mykey(args._[1], args._[2])
		} else {
			if (args._[1]) {
			myvalue = await Rejson.myobj(args._[1])
			} else {
		//	myvalue = 'nothing to scan'
			return
			}
		}
		await console.log(typeof myvalue)
		await console.log('Keys: ')
		await console.dir(myvalue)
		return await myvalue
	} catch (err) {
		console.log(err)
	}
}


