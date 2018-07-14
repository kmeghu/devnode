const redis = require('redis')
const jsonify = require('redis-jsonify')



module.exports = async (u) => {
	try {
		var myres = {}
		const rclient = jsonify(redis.createClient('redis://redis:6379'))
		await rclient.hget('uid', u, function (err, reply) {
			//console.log(reply)
			//console.log(typeof reply)
			myres = reply
			return myres
			})
		await rclient.quit()
	} catch (err) {
		console.log(err.message)
		throw new Error(err)
	}
}
