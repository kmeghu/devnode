const findUID = require('/c/work/devnode/keystore.js')


module.exports.findUID = function (x) {
	return new Promise(function(resolve, reject) {
		findUID(x)
		.then(function (value, err) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

