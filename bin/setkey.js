"use strict";

const path = require('path');
const scriptname = 'keystore'
const classcall = `../class/${scriptname}`
const Keystore = require(classcall)


module.exports = async (args) => {
	try {
		if (!args._[0]) {
			require('../bin/help')(args)
			return
		}
		const myKeys = new Keystore()
		myKeys.print()
		console.log('RUNTIME passed args : %j', args)
		if (args.keyhost) {
			console.log('keyhost arg ; ' + args.keyhost)
				myKeys.setKeyhost(args.keyhost)
		} else {
				myKeys.setKeyhost()
		}
		if (args.ttl) {
			console.log('ttl arg ; ' + args.ttl)
			myKeys.setOpt(args)
		}
		myKeys.print()
		if (args.key && args.value) {
			console.log('key arg : ' + args.key + ' value arg : ' + args.value)
			console.dir(args)
		await myKeys.setKey(args.key, args.value)
		//await myKeys.print()
		await myKeys.showRes()
		}
		//let myvalue = await myKeys.resVal()
		//await console.log(myvalue)
	} catch (err) {
		console.log(err)
	}
}


