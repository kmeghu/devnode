"use strict";

const path = require('path');
const scriptname = path.basename(__filename);
const classcall = `../class/${scriptname}`
//const Keystore = require('../fun/redis')
const redis = require('redis')
//const jsonify = require('redis-jsonify')
const Rejson = require('../fun/rejson')



module.exports = async (args) => {
	try {
		let myvalue = {}
		var mylength = 0
		console.log('RUNTIME passed args : %j', args)
		if (args.flush) {
			const client = redis.createClient('redis://redis:6379')
			await client.flushdb()
			await client.quit()
			//return
		}
		if ((args._[1]) && (args.index)) {
			let mycnt = 0
			mylength = await Rejson.count(args._[1])
			for (var i = 1; i < mylength; i++) {
				myvalue = await Rejson.mykey(args._[1], '_' + i + '.' + args.index)
				var mycvar = JSON.stringify(await myvalue)
				if ((mycvar.length) < 7) {
					continue
				} else {
					mycnt++
					console.dir(await myvalue)
				}
				
				}
				console.log(await mycnt + ' of ' + mylength + ' objects have ' + args.index + ' '  + args._[0] + ' ' + args._[1])
				args._[1] = 'ls'
		}
		if ((args._[1]) && (args.schema)) {
			let myout = await Rejson.myobj(args._[1], '_1')
			console.log(await myout)
			args._[1] = 'ls'
		}
		if ((args._[2]) && (args._[1])) {
			myvalue = await Rejson.mykey(args._[1], args._[2])
			console.log(await myvalue)
			return await myvalue
		}
		if ((args._[1] === 'ls') || (!args._[1])) {
			let myhelp = { '_' : ['rls'] }	
			let myout = await require('../bin/rls')(myhelp)
			console.log(await myout)
			args._[1] = 'ls'
			//await rclient.quit()
			}
		if (args._[1] !== 'ls' && (!args._[2])) {
			myvalue = await Rejson.myobj(args._[1])
			console.log(await myvalue + ' ')
			//return 
			//return await Rejson.close()
		}
		await Rejson.close()
	} catch (err) {
		console.log(err.message)
		throw new Error(err)
	}
}


