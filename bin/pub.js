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
const doParse = require('../fun/tagit')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
const CpLive = require('../fun/session')
const Cpapi = require('../class/cpapi')
let mykey = 'tag'
// example runtime for your class method
//

module.exports = async (args) => {
	try {
		const cpSession = await CpLive()
		const Myclose = new Cpapi(cpSession)
		Myclose.setCmd('publish')
		Myclose.print()
		console.log(await Myclose.apiPost())
		//await Myclose.print()
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	}
}

