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
const doParse = require('../fun/testobj')
const Keystore = require('../class/keystore')
const Cpobject = require('../class/object')
//let mykey = 'obj'

// example runtime for your class method
//

module.exports = async (x) => {
	try {
		const myKeystore = new Keystore()
		let myValue = await myKeystore.getAll(x)
		console.log('my key directory is : ' + myValue.key)
		let myKeylist = Object.keys(myValue.result)
		myKeylist.forEach(function(value) {
			console.log('key: ' + value)
		})
		return myKeylist
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	} finally {
		//let runcmd = {'_':['logout']}
		//require('../bin/logout')(runcmd)
		console.log(scriptname + ' function finally done.')
	}
}

