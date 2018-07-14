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
	return await startup
}
const myoffset = 0
const pglimit = 500
const details = 'full'
const path = require('path');

const doParse = require('../fun/testobj')
const doClean = require('../fun/rjcache')
//const getUid = require('../fun/reduid')
//const redis = require('redis')
//const jsonify = require('redis-jsonify')
const Rejson = require('../fun/rejson')

const cpLive = require('../fun/session')
const Cpapi = require('../class/cpapi')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
let mycmd = 'show-objects'

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
		if (args.unused) {
			console.log('showing unused objects')
			mycmd = 'show-unused-objects'
		}
		const cpSession = await cpLive()
		await console.dir(cpSession)
		if (!cpSession.uid) {
			require('../bin/login')
			console.log('No Active Session, please login')
			return
		}
		let Myapi = await new Cpapi(cpSession)
		await Myapi.print()
		if (mycmd !== 'show-commands') {
		await Myapi.setCnt(myoffset, pglimit)
		await Myapi.setDetail(details)
		}
		if (args) {
		await Myapi.addData(args)
		}
		await Myapi.setCmd(mycmd)
		await Myapi.print()
		let mycpres = await Myapi.apiPost()
		let parsedObj = []
		parsedObj.push(await doParse(mycpres))
		if (mycpres.total > mycpres.to) {
			let inoffset = Number(myoffset) + Number(pglimit)
			while (mycpres.total > inoffset) {
				await Myapi.setCnt(inoffset, pglimit)
				mycpres = await Myapi.apiPost()
				parsedObj.push(await doParse(mycpres))
				inoffset = Number(inoffset) + Number(pglimit)
			}
		}
		if (mycmd === 'show-unused-objects') {
			args.filter = 'unused'
			args.type = 'object'
			if (!args.tags) {
				args.tags = 'unused'
			}
		}
		if (!args.filter) {
			args.filter = 'all'
		}
		if (!args.type) {
			args.type = 'object'
		}
	Rejson.rootkey(args).then((myio) => {
		return myio
	})
		var mycount = 0
		for (var i in parsedObj) {
			for (var j in parsedObj[i]) {
				let myObj = Object.keys(parsedObj[i][j]).reduce((p, c) => ({...p, [c]: parsedObj[i][j][c]}), {})
				if (!myObj) {
					continue
				} else {
				mycount++
				Rejson.filter(args.filter, '_' + mycount, myObj).then((myfil) => {
					return myfil
					})
				}
			//console.log(j + ' Middle block count: ' + mycount)
			}
		console.log(i + ' Outer block FINAL count: ' + mycount)
		}
		Rejson.close()
		return
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(args)
	} finally {
		let runcmd = {'_':['logout']}
		require('../bin/logout')(runcmd)
		//require('../bin/logout')
		return
	}
}

