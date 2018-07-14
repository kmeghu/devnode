"use strict";

const scriptname = 'keystore'
const classcall = `../class/${scriptname}`
const Keystore = require(classcall)


module.exports = async (x) => {
	try {
		const myStore = new Keystore()
		myStore.setKeyhost()
		if (x.ttl) {
			myStore.setOpt(x)
		}
		if (typeof x.value == 'object') {
			postval = JSON.stringify(x.value)
		}
		if (x.key && x.value) {
			await myStore.setKey(x.key, x.value)
		}
		return
	} catch (err) {
		throw new Error(err)
	}
}


