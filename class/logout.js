"use strict";

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
//const myFunc = require(funcall)
const myApi = require('../fun/api')

module.exports = class Logout {

	constructor(x) {
		this.x = x
	}

	async closeToken () {
		const mydata = {}
		let mymethod = 'post'
		let myauth = {}
		let myurl = `https://${this.host}/web_api/`
		let mycmd = 'logout'
		mydata.method = mymethod
		mydata.data = myauth
		mydata.baseURL = myurl
		mydata.url = mycmd
		//console.dir(mydata)
		let myres = await myApi(mydata)
		//await console.dir(myres)
		return await myres
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

