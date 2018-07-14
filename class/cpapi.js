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
// axios API constructor for Check Point
// class/cpapi
const myApi = require('../fun/api')


module.exports = class Cpapi {

	constructor(that) {
		this.method = 'post'
		this.headers = { 'X-chkp-sid': that.sid }
		this.baseURL = that.url + '/'
		this.data = {}
	}

	cntObj (from, to, total) {
		this.data.from = from
		this.data.to = to
		this.data.total = total
		return this
	}

	setCnt (offset, limit) {
		this.data.offset = offset
		this.data.limit = limit
		return this
	}

	setDetail (detail) {
		this.data['details-level'] = detail
		return this
	}

	setCmd (cmd) {
		this.url = cmd
		return this
	}

	addData (x) {
		if (x.filter) {
		this.data.filter = x.filter
		}
		if (x.type) {
		this.data.type = x.type
		}
		if (x.ip) {
		this.data['ip-only'] = x.ip
		}
		if (x.name) {
			this.data.name = x.name
		}
		if (x.uid) {
			this.data.uid = x.uid
		}
		if (x.uid) {
			this.data.uid = x.uid
		}
		return this
	}

	setData (x) {
		this.data = x
		return this
	}

	rmData () {
		this.data = {}
		return this
	}

	print () {
		console.dir(this)
		console.log('\n')

	}

	show () {
		//console.log(Object.getOwnPropertyNames(this.response.data))
		console.log(Object.getOwnPropertyDescriptors(this.response.data))
		//console.log(Object.getOwnPropertySymbols(this.response.data))
		//console.log(Object.keys(this.response.data) + ' : ' + Object.values(this.response.data))
		//let myvalue = (Object.values(this.response.data))
		//let mykey = (Object.keys(this.response.data))
		//console.log(mykey + ' : ' + myvalue)
	}

	async apiPost () {
		this.response = {}
		this.response = await myApi(this).catch((err) => { throw new Error(err)})
		return this.response.data
	}

}

