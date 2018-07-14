"use strict";
// Where Used - collect data on where objects are being used
//

// function for returning object use in policy
// recieve and process args from the callout
// this will show you return values of your args 
// for runtime
//
const delay = async () => {
	const incmd = {'_':['login', 'opb']}
	const startup = await require('../bin/login')(incmd)
	return await startup
}

const cpLive = require('../fun/session')
const Cpapi = require('../class/cpapi')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
const doWrite = require('../fun/writefile')
let mycmd = 'where-used'

// runtime for your function, needs x.uid or x.name
// to search for useage
//

module.exports = async (x) => {
	try {
		await delay()
		const cpSession = await cpLive()
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
			return
		}

		let Myapi = await new Cpapi(cpSession)
		if (x.uid || x.name) {
		await Myapi.addData(x)
		}
		await Myapi.setCmd(mycmd)
		await Myapi.print()
		let mycpuse = await Myapi.apiPost()
		let cpdiruse = mycpuse['used-directly']
		await doWrite(mycmd, cpdiruse)
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

