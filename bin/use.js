"use strict";
// Where Used - collect data on where objects are being used
//

// main runtime
// recieve and process args from the callout
// this will show you return values of your args 
// for runtime
//
const delay = async () => {
	const incmd = {'_':['login', 'opb']}
	const startup = await require('../bin/login')(incmd)
	return await startup
}

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
//const myClass = require(classcall)

//const doParse = require('../fun/testobj')

const cpLive = require('../fun/session')
const Cpapi = require('../class/cpapi')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
const Rejson = require('../fun/rjcache')
let mycmd = 'where-used'

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		let newcpdata = {}
		await delay()
		if (args._[1]) {
			console.log(args._[1])
			mycmd = args._[1]
		}
		const cpSession = await cpLive()
		await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
		}
		let Myapi = await new Cpapi(cpSession)
		await Myapi.print()
		if (args.uid || args.name) {
		await Myapi.addData(args)
		}
		await Myapi.setCmd(mycmd)
		await Myapi.print()
		let mycpuse = await Myapi.apiPost()
		let cpdiruse = mycpuse['used-directly']
		await console.log('%j', cpdiruse)
		await console.log(typeof cpdiruse)
		await Rejson(cpdiruse)
		return await cpdiruse
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	} finally {
		let runcmd = {'_':['logout']}
		require('../bin/logout')(runcmd)
		return
	}
}

