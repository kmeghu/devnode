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
const classcall = `../class/${scriptname}`
const myClass = require(classcall)
const doWrite = require('../fun/writefile')
//const Cptoken = require('../class/token')

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../bin/help')(args)
			return
		}
		console.dir(args._[1])
		const mySession = new myClass(args._[1])
		mySession.print()
		await mySession.setAuth()
		//await mySession.print()
		let myapi = await mySession.getToken()
		await doWrite('session', myapi.data)
		return myapi.data
		//await console.dir(myapi.data)
		//const myToken = await new Cptoken(myapi.data)
		//return myToken
		//await myToken.print()
		//await console.dir(myToken)
		//return await myapi.data
		//let myclose = await  myThing.closeToken(myToken)
		//await console.dir(myclose.data)
	} catch (err) {
		console.log('ERROR IN SESSION LOGIN for ' + args)
		console.log(err)
		return process.exit(1)
	}
}

