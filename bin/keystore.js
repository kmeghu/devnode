"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
const Keystore = require(classcall)


module.exports = async (args) => {
	try {
		const myKeys = new Keystore()
		myKeys.print()
		console.log('RUNTIME passed args : %j', args)
		if (args.keyhost) {
				myKeys.setKeyhost(args.keyhost)
		} else {
				myKeys.setKeyhost()
		}
		if (!args.key) {
			args.key = '/'
		}
		if (args.recursive) {
			myKeys.setOpt(args)
		}
		myKeys.print()
		console.log(JSON.stringify(await myKeys.getKey(args.key), null, 2))
		//return await myvalue
	} catch (err) {
		console.log(err)
	}
}


