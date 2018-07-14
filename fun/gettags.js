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
const mykey = 'obj'

// example runtime for your class method
//

module.exports = async () => {
	try {
		let mytags = []
		const myKeystore = new Keystore()
		let myValue = await myKeystore.getAll(mykey)
		console.log('my key directory is : ' + myValue.key)
		Object.keys(myValue.result).forEach((value) => 
			Object.values(myValue.result[value]).forEach((kvalue) =>
				mytags.push({ 'name' : kvalue })))
				//console.log(value + ' name: ' + kvalue)))
		//myKeylist.forEach(function(value) {
		//	console.log('key: ' + value)
		//})
		return mytags
	} catch (err) {
		console.log('ERROR IN SESSION event : ' + err.message)
		console.log(err)
	} finally {
		//let runcmd = {'_':['logout']}
		//require('../bin/logout')(runcmd)
		console.log(scriptname + ' function finally done.')
	}
}

