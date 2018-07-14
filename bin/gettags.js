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
const delay = async () => {
		const incmd = {'_':['login', 'opb']}
		const startup = require('../bin/login')(incmd)
		await console.log(startup)
		return startup
}
const path = require('path');
const scriptname = path.basename(__filename);
const funcall = `../fun/${scriptname}`
const doParse = require(funcall)
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
const CpLive = require('../fun/session')
const Cpapi = require('../class/cpapi')
//const cpSession = CpLive()
let mykey = 'obj'

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		await delay()
		const cpSession = await CpLive()

		if (args._[1]) {
			mykey = args._[1]
		}
		await console.dir(cpSession)
		let cpRes = await doParse(mykey)
		console.log(' ')
		console.log('Tags to set : ' + cpRes.length)
		//await console.dir(cpRes)
		Object.keys(cpRes).forEach(key => {
			console.log(cpRes[key])
			const Myapi = new Cpapi(cpSession)
			Myapi.setData(cpRes[key])
			Myapi.setCmd('add-tag')
			Myapi.print()
		//	Myapi.apiPost()
		})
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	} finally {
		//let runcmd = {'_':['logout']}
		//require('../bin/logout')(runcmd)
		const cpSession = await CpLive()
		const Myclose = new Cpapi(cpSession)
		Myclose.setCmd('publish')
		Myclose.print()
		Myclose.apiPost()
		console.log(scriptname + ' finally DONE')
	}
}

