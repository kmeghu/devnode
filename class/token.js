"use strict";
//
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
const funcall = `../bin/auth`
const myCreds = require(funcall)
const myApi = require('../fun/api')


module.exports = class CPtoken {

	constructor(that) {
		//this._ = that._
		this.uid = that.uid
		this.sid = that.sid
		this.url = that.url
		this.ttl = that['session-timeout'] || that.ttl
	}

	set data(x) {
		this.data.x = x
		//this.data.limit = x.limit
		//this.data['details-level'] = x.details
	}


	print () {
		console.dir(this)
		console.log('\n')

	}

	show () {
		console.log(Object.getOwnPropertyNames(this))
		console.log(Object.getOwnPropertyDescriptors(this))
		console.log(Object.getOwnPropertySymbols(this))
		//console.log(Object.keys(this) + ' : ' + Object.values(this))
		//console.log(Object.values(this))
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
		let myres = await myApi(mypost).catch((err) => { throw new Error(err)})
		return myres
	}

	async getMe (x, d, y) {
		const mypost = {}
		let mydata = {
			'offset': d.offset,
			'limit': d.limit,
			'details-level' : d['details-level']
		}
		mydata.type = y.type
		if (y.filter) {
			mydata.filter = y.filter
		}

		let mymethod = 'post'
		let myheaders = { 'X-chkp-sid': x.sid }
		let myurl = x.url
		let mycmd = '/show-objects'
		mypost.method = mymethod
		mypost.data = mydata
		mypost.headers = myheaders
		mypost.baseURL = myurl
		mypost.url = mycmd
		let myres = await myApi(mypost).catch((err) => { throw new Error(err)})
		return myres
	}

	async usedIn (x, d) {
		const mypost = {}
		let mydata = {}
		mydata.uid = d.uid
		let mymethod = 'post'
		let myheaders = { 'X-chkp-sid': x.sid }
		let myurl = x.url
		let mycmd = '/where-used'
		mypost.method = mymethod
		mypost.data = mydata
		mypost.headers = myheaders
		mypost.baseURL = myurl
		mypost.url = mycmd
		let myres = await myApi(mypost).catch((err) => { throw new Error(err)})
		return myres
	}


	async showObjects (x, d) {
		const mypost = {}
		let mydata = {
			'offset': d.offset,
			'limit': d.limit,
			'details-level' : d['details-level']
		}

		let mymethod = 'post'
		let myheaders = { 'X-chkp-sid': x.sid }
		let myurl = x.url
		let mycmd = '/show-objects'
		mypost.method = mymethod
		mypost.data = mydata
		mypost.headers = myheaders
		mypost.baseURL = myurl
		mypost.url = mycmd
		let myres = await myApi(mypost).catch((err) => { throw new Error(err)})
		return myres
	}

	setPage (from, to, total) {
		this.from = from
		this.to = to
		this.total = total
		return this
	}

	setOff (offset, limit, details) {
		this.offset = offset
		this.limit = limit
		this['details-level'] = details
		return this
	}

}

