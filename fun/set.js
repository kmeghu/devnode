"use strict";
// STOP - THIS IS A TEMPLATE
//
// copy this to the new filename for your class method
// put a copy of your main runtime with the class in bin/
// put a copy of the class constructor in class/
// put a copy of the functions your class needs in fun/

// main runtime
// recieve and process args from the callout
// this will show you return values of your args 
// for runtime
//
const path = require('path');
const scriptname = path.basename(__filename);
const cpLive = require('../fun/session')

const Cpapi = require('../class/cpapi')

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		if (args) {
			console.dir(args)
		}
		const cpSession = await cpLive()

		await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
		}
		const Myapi = new Cpapi(cpSession)
		Myapi.addData(args)
		Myapi.setCmd('add-tag')
		Myapi.print()
		let myRes = await Myapi.apiPost()
		return await myRes
		
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	}
}

