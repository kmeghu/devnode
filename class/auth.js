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
const myFunc = require(funcall)
const myApi = require('../fun/api')

module.exports = class Auth {

	constructor(x) {
		this.dir = `ctrl/cfg/mg/${x}/config_system/`
	}

	async setAuth () {
		this.user = await myFunc(this.dir + 'mgmt_admin_name')
		this.passwd = await myFunc(this.dir + 'mgmt_admin_passwd')
		this.host = await myFunc(this.dir + 'hostname')
		return this
	}
	async getToken () {
		const mypost = {}
		let mymethod = 'post'
		let mydata = {
			'user': this.user,
			'password': this.passwd
		}
		let myurl = `https://${this.host}/web_api/`
		let mycmd = 'login'
		mypost.method = mymethod
		mypost.data = mydata
		mypost.baseURL = myurl
		mypost.url = mycmd
		//console.dir(mydata)
		let myres = await myApi(mypost)
		//await console.dir(myres)
		return await myres
	}
	async closeToken (x) {
		const mypost = {}
		let mymethod = 'post'
		let mydata = {}
		let myheaders = { 'X-chkp-sid': x.sid }
		let myurl = x.url
		let mycmd = '/logout'
		mypost.method = mymethod
		mypost.data = mydata
		mypost.headers = myheaders
		mypost.baseURL = myurl
		mypost.url = mycmd
		//console.dir(mypost)
		let myres = await myApi(mypost)
		return myres
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

