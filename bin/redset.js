"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
const Keystore = require('../fun/redis')


module.exports = async (args) => {
	try {
		console.log('RUNTIME passed args : %j', args)
		if (!args.key) {
			args.key = 'test'
		}
		if (!args.value) {
			args.value = 'my test value'
		}
		//console.log(JSON.stringify(await Keystore.get(args.key), null, 2))
		const myvalue = await Keystore.set(args.key, args.value)
		return await myvalue
	} catch (err) {
		console.log(err)
	}
}


