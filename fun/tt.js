
const Redis = require('redis-utils-json');

// this function takes in the raw check point object, and indexes it as a full object
// without using a class. Rather then load a full method, you just want the details
// we index all objects in a keystore cache of obj/uid/myObj.type/myObj.uid
// with the full json return value of this item as the value.
//
// This allows retrivial of full object properties from in memory keystore
//
// The writekey function simply applies x.key, x.value (must be stringified for keystore)
// to the etcd. Sub in other key functions to taste.
//
// applying writekey function 


module.exports = async (x) => {
	try {
		const client = new Redis('redis://redis:6379')
		return new Promise(function(resolve, reject) {
			let mydata = JSON.stringify(x)
			client.setKey('type:' + x.type, x, function (err, res) {
			if (err) {
				reject(err)
			} else {
				process.stdout.write('+')
				resolve(res)
			}
		})
		client.quit(function () {	})
	})

	} catch (err) {
		throw new Error(err)
	}
}
