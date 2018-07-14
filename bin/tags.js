"use strict";

const path = require('path');
const scriptname = 'token'
const classcall = `../class/${scriptname}`
const Cptoken = require(classcall)
const cpLive = require('../fun/session')
const cpSession = cpLive()



module.exports = async (args) => {
	try {
		await console.dir(cpSession)
		const seeTags = await new Cptoken(cpSession)
		await console.dir(args)
		let myuse =  await seeTags.usedIn(cpSession, args)
		await console.dir(myuse)
			return await myuse
	} catch (err) {
		console.log(err)
	}
}


