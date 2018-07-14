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
//const myClass = require(classcall)
//const doAuth = require('../bin/auth')
const doWrite = require('../fun/writefile')
const doKey = require('../fun/writekey')
const doRedis = require('../fun/redis')
const Cptoken = require('../class/token')
//const cpSession = require('../playground/session.json')
const Keysession = require('../class/keystore')

// example runtime for your class method
//

module.exports = async () => {
	try {
		const cpKeys = new Keysession('keystore.toonces')
		await cpKeys.getKey('api/session')
		const cpsend = await cpKeys.resVal()
		const cpSession = await JSON.parse(cpsend)
		await console.dir(cpSession)
		if (cpSession.message) {
			let myhelp = { '_' : ['help', 'login'] }
			console.log('Session logout message recieved')
			require('../bin/help')(myhelp)
			return
		} else {
		//await cpKeys.setOpt(cpSession)
		const endToken = await new Cptoken(cpSession)
		//
		let myclose = await endToken.closeToken(endToken)
		myclose.key = 'api/session'
		myclose.value = JSON.stringify(myclose.data)
		await doKey(myclose)
		await doRedis.expire('session', myclose.data, 20)
		//await doRedis.expire('session', 20)
		await console.dir(myclose.data)
		}
	} catch (err) {
		console.log('ERROR IN SESSION LOGOUT ' + err.message)
		console.log('session token in api key expired?')
		return process.exit(1)
	}
}

