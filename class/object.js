"use strict";

//Constructor
// ES6 style
//

module.exports = class CPObj {

	constructor(x) {
		//this.uid = x.uid || 'not defined'
		this.name = x.name || 'no name'
		//this['set-if-exists'] = 'true'
		//this.tags = []
		//this.type = x.type || 'not my type'
	}

	dump (x) {
		if (this.x) {
			return this[x]
		} else {
			return this
		}
	}

	tag (x) {
		if (!this.tags) {
			this.tags = {'add': x}
		} else {
		//this.tags.push(x)
		this.tags += {x}
		}
		return this
	}

	overwrite () {
		this['set-if-exists'] = 'true'
	}

	host (x) {
		if (x['ipv4-address']) {
		this['ipv4-address'] = x['ipv4-address']
		}
		if (x['ipv6-address']) {
		this['ipv6-address'] = x['ipv6-address']
		}
		return this
	}

	network (x) {
		if (x['subnet4']) {
		this['subnet4'] = x['subnet4']
		}
		if (x['subnet6']) {
		this['subnet6'] = x['subnet6']
		}
		if (x['mask-length4']) {
		this['mask-length4'] = x['mask-length4']
		}
		if (x['mask-length6']) {
		this['mask-length6'] = x['mask-length6']
		}
		return this
	}

	group (x) {
		const mymembers = {}
		for (var i in x) {
		const myGroups = Object.keys(x).reduce((p, c) => ({...p, [c]: x[c]}), {})
			mymembers.push(x)
		}
		this.members = x.members
		return this
	}

	range (x) {
		if (x['ip-address-first']) {
		this['ip-address-first'] = x['ip-address-first']
		}
		if (x['ip-address-last']) {
		this['ip-address-last'] = x['ip-address-last']
		}
		return this
	}


}
