const myfunction = require('SOMEFUNCTION')


module.exports.FUNCTIONID = function (x) {
	return new Promise(function(resolve, reject) {
		myfunction(x)
		.then(function (value, err) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

