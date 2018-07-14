"use strict";

// put a copy of your main runtime with the class in bin/
// put a copy of the class constructor in class/
// put a copy of the functions your class needs in fun/
//
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
//const myFuncall = require(funcall)
const cpLive = require('../fun/session')

const Keystore = require('../class/keystore')
let mykey = 'tag'

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		await delay()
		if (args.key) {
			console.log(args.key)
			mykey = args.key
		}
		const cpSession = await cpLive()

		await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
		}
		
		const myObj = new Keystore()
		const showMe = await myObj.getAll(mykey)
		const showRes = await showMe
		await console.dir(showRes)
		await console.log(typeof showRes)

		await Object.entries(showRes).forEach(([key, value]) => {
			//console.log(`${key} => ${key[value]} `)
			let mydata = {}
			mydata = value
			console.dir(mydata)
			if (args.commit) {
				const myFuncall = require('../fun/set')
				myFuncall(mydata)
			}
		})
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	}
}

