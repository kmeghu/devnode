const redis = require('redis')
const jsonify = require('redis-jsonify')

const client = jsonify(redis.createClient('redis://redis:6379'))

module.exports.get = function (k) {
		return new Promise(function(resolve, reject) {
			client.get(k, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.all = async (k) => {
		const rclient = redis.createClient('redis://redis:6379')
		return new Promise(function(resolve, reject) {
			rclient.keys(k, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
			rclient.quit()
	})
}

module.exports.set = async (k, v) => {
		return new Promise(function(resolve, reject) {
			client.set(k, v, function (err, res) {
			if (err) {
				reject(err)
			} else {
				process.stdout.write('+')
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.hset = async (h, k, v) => {
		return new Promise(function(resolve, reject) {
			client.hset(h, k, v, function (err, res) {
			if (err) {
				reject(err)
			} else {
				process.stdout.write('+')
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.hget = async (f, k) => {
		return new Promise(function(resolve, reject) {
			client.hget(f, k, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		client.quit()
	})
}

module.exports.hkeys = async (h) => {
		return new Promise(function(resolve, reject) {
			client.hkeys(h, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.hlen = async (h) => {
		const rclient = redis.createClient('redis://redis:6379')
		return new Promise(function(resolve, reject) {
			rclient.hlen(h, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
		rclient.quit(function () {	})
	})
}

module.exports.expire = async (k, v, exp) => {
		return new Promise(function(resolve, reject) {
			client.setex(k, exp, v, function (err, res) {
			if (err) {
				reject(err)
			} else {
				process.stdout.write('.')
				resolve(res)
			}
		})
		client.quit(function () {	})
	})
}

module.exports.close = async () => {
		return new Promise(function(resolve, reject) {
			client.quit(function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

