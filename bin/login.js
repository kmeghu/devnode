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
const doAuth = require('../bin/auth')
const doWrite = require('../fun/writefile')
const doKey = require('../fun/writekey')
const doRedis = require('../fun/redis')
const Cptoken = require('../class/token')
//const CpSession = require('../playground/session.json')

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../bin/help')(args)
			return
		}
		const myAuth = await doAuth(args)
		let myToken = await new Cptoken(myAuth)
		await doWrite('token', myToken)
		const myKey = {}
		myKey.key = await 'api/session'
		myKey.value = await JSON.stringify(myToken)
		myKey.ttl = await myToken.ttl
		await doKey(myKey)
		await doRedis.expire('session', myAuth, myAuth['session-timeout'])
		await console.dir(myToken.uid)
		// run api commands here
		//
		//await myToken.print()
		//let myshow = await myToken.showObject(myToken)
		//await console.dir(myshow.data.from)
		//await console.dir(myshow.data.to)
		//await console.dir(myshow.data.total)
		//
		//let myclose = await myToken.closeToken(myToken)
		//await doWrite('session', myclose.data)
		//await console.dir(myclose.data)
	} catch (err) {
		console.log('ERROR IN SESSION LOGIN : ' + err.message )
		console.log(err)
		return process.exit(1)
	}
}

