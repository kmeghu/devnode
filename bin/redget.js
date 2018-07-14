"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
const Keystore = require('../fun/redis')


module.exports = async (args) => {
	try {
		console.log('RUNTIME passed args : %j', args)
		if (!args.key) {
			args.key = 'test'
		}
		//console.log(JSON.stringify(await Keystore.get(args.key), null, 2))
		const myvalue = await Keystore.hget(args.key)
		await console.dir(myvalue)
		await console.log(typeof myvalue)
		if (myvalue === null) {
			await console.log(args.key + ' not a key in redis')
		} else {
			if (myvalue.type === 'group') {
		await console.log('Members: ')
		await console.dir(myvalue.members)
			}
			if (myvalue.uid) {
		await console.log('UID: ' + myvalue.uid)
			}
			if (myvalue.sid) {
		await console.log('SID: ' + myvalue.sid)
		await console.log('Last Login at: ')
		await console.dir(myvalue['last-login-was-at'])
			}
			if (myvalue.name) {
		await console.log('Name: ' + myvalue.name)
		await console.log('Type: ' + myvalue.type)
			}
			if (myvalue.message) {
				console.log('Logout: ' + myvalue.message)
			}
		}
	} catch (err) {
		console.log(err)
	}
}


