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
//const classcall = `../class/${scriptname}`
//const myClass = require(classcall)
const cpLive = require('../fun/session')
//let cpSession = await cpLive()

// example runtime for your class method
//

module.exports = async (args) => {
	try {
		const myThing = new Thing()
		myThing.print()
		myThing.read()
		await myThing.update()
		await myThing.print()
	} catch (err) {
		console.log(err)
	}
}



//Class Constructor
// ES6 style
//
// this is your class method for constructing objects
// be sure to export it, as well as call the functions it needs 
// to return your values to the object
// will call the script of the same name in fun/
//
const path = require('path');
const scriptname = path.basename(__filename);
const funcall = `../fun/${scriptname}`
const myFunc = require(funcall)

module.exports = class Thing {

	constructor(x) {
		this.x = x
	}

	print () {
		console.log(this)
		console.log('\n')
		
	}

	show () {
		console.log(Object.getOwnPropertyNames(this.result))
		console.log(Object.getOwnPropertyDescriptors(this.result))
		console.log(Object.getOwnPropertySymbols(this.result))
		console.log(Object.keys(this.result))
		console.log(Object.values(this.result))
	}

	create (x) {
		if (this.x) {
			return
		} else {
			this.x = x
		}
		return this
	}

	read (x) {
		if (!this.x) {
			return this
		} else {
			return this.x
		}
	}

	update (x) {
		if (this.x) {
			this.x = x
		}
		return this
	}

	destroy (x) {
		if (this.x) {
			this.x = 'deleted'
		}
		return this
	}

}

